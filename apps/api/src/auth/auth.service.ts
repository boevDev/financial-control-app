import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async register(email: string, password: string) {
		const passwordHash = await bcrypt.hash(password, 10);

		const user = await this.prisma.user.create({
			data: { email, passwordHash },
		});

		return this.generateTokens(user.id);
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) throw new UnauthorizedException();

		const valid = await bcrypt.compare(password, user.passwordHash);
		if (!valid) throw new UnauthorizedException();

		return this.generateTokens(user.id);
	}

	async generateTokens(userId: number) {
		const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' });
		const refreshToken = this.jwt.sign({ sub: userId }, { expiresIn: '7d' });

		const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshToken: refreshTokenHash },
		});

		return { accessToken, refreshToken };
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
