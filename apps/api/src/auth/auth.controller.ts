import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async register(
		@Body() dto: { email: string; password: string },
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.register(
			dto.email,
			dto.password,
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
		});

		return { accessToken };
	}

	@Post('login')
	async login(
		@Body() dto: { email: string; password: string },
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.login(dto.email, dto.password);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
		});

		return { accessToken };
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	me(@Req() req: Request) {
		return req.user;
	}

	@Post('refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies['refreshToken'];
		const { accessToken, refreshToken: newRefreshToken } =
			await this.authService.refreshTokens(refreshToken);

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: false, // true на проде
		});

		return { accessToken };
	}
}
