import { IPrisma } from './database/prisma.interface';
import { ILogger } from './logger/logger.interface';
import { IBotTelegram } from './telegram/telegram.interface';

export class App {
	logger: ILogger;
	botTelegram: IBotTelegram;
	prisma: IPrisma;

	constructor(logger: ILogger, botTelegram: IBotTelegram) {
		this.botTelegram = botTelegram;
		this.logger = logger;
	}

	init(): void {
		this.botTelegram.init();
	}
}
