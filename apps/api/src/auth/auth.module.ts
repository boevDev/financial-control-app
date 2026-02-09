import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			imports: [ConfigModule], // подгружаем модуль конфигов
			inject: [ConfigService], // инжектим ConfigService
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'), // берём из .env
				signOptions: { expiresIn: '15m' },
			}),
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
