import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: ['http://localhost:5173', 'https://financial-control-app-six.vercel.app/'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	app.use(cookieParser());

	const port = process.env.PORT || 3000;

	await app.listen(port, '0.0.0.0');

	console.log(`Backend is running on port: ${port}`);
}
bootstrap();
