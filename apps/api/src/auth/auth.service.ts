import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@repo/db';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async register(email: string, password: string) {
		const passwordHash = await bcrypt.hash(password, 10);

		try {
			const user = await this.prisma.user.create({
				data: { email, passwordHash },
			});

			return this.generateTokens(user.id);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
				throw new ConflictException('User with this email already exists');
			}

			throw error;
		}
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) throw new UnauthorizedException();

		const valid = await bcrypt.compare(password, user.passwordHash);
		if (!valid) throw new UnauthorizedException();

		return this.generateTokens(user.id);
	}

	async generateTokens(userId: number) {
		try {
			const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' });
			const refreshToken = this.jwt.sign({ sub: userId }, { expiresIn: '7d' });

			// хешируем refreshToken
			const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

			// обновляем пользователя
			await this.prisma.user.update({
				where: { id: userId },
				data: { refreshToken: refreshTokenHash },
			});

			// возвращаем оба токена
			return { accessToken, refreshToken };
		} catch (err) {
			console.error('Error in generateTokens:', err);
			throw new Error('Failed to generate tokens');
		}
	}

	async refreshTokens(refreshToken: string) {
		if (!refreshToken) throw new UnauthorizedException();

		// достаём всех пользователей с refreshToken (можно фильтровать, если пользователей много)
		const users = await this.prisma.user.findMany({
			where: { refreshToken: { not: null } },
		});

		// TS знает, что userFound будет User | null
		let userFound: User | null = null;

		for (const u of users) {
			if (u.refreshToken && (await bcrypt.compare(refreshToken, u.refreshToken))) {
				userFound = u;
				break;
			}
		}

		if (!userFound) throw new UnauthorizedException();

		return this.generateTokens(userFound.id);
	}
}
