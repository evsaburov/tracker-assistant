import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import { ILoggerService } from '../../logger/logger.interface';
import { IConfigService } from '../../config/config.service.interface';
import { Command } from '../rutracker/commands/commands.class';
import { StartCommand } from '../rutracker/commands/start.command';
import LocalSession from 'telegraf-session-local';
import { HelpCommand } from '../rutracker/commands/help.command';
import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { IBotTracker } from './telegram.interface';
import { IUserService } from '../../users/user.service.interface';
import { userController } from './middleware/user.controller';

@injectable()
export class BotTracker implements IBotTracker {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {
		this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN_RUTRACKER'));
		this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
		this.middleware();
	}

	middleware(): void {
		this.bot.use(async (ctx, next) => {
			const result = await userController(ctx, this.userService);
			if (result) await next();
		});
	}

	init(): void {
		this.commands = [new StartCommand(this.bot), new HelpCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}
		this.bot.launch();
		this.loggerService.log('Бот запущен');
	}
}
