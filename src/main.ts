import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';
import { TrackService } from './tracker/tracker.service';
import { TrackRepository } from './tracker/track.repository';
import { PrismaService } from './database/prisma.service';
import { BotTelegram } from './telegram/telegram';

async function bootstrap(): Promise<void> {
	const logger = new LoggerService();
	const config = new ConfigService();

	const botTelegram = new BotTelegram(logger, config);
	const app = new App(logger, botTelegram);

	const prisma = new PrismaService(logger);
	const trackRepository = new TrackRepository(prisma);
	const track = new TrackService(trackRepository, config, logger);
	await track.update();

	app.init();
}

bootstrap();
