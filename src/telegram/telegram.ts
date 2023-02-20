import 'dotenv/config';
import { Context, Markup, Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import LocalSession from 'telegraf-session-local';
import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject';
import 'reflect-metadata';
import { IBotTracker } from './telegram.interface';
import { userController } from './middleware/user.controller';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from '../users/user.service.interface';
import { Command } from './commands/commands';
import { StartCommand } from './commands/start.command';
import { HelpCommand } from './commands/help.command';
import { TrackCommands } from './commands/track.commands';
import { trackKBDefault } from './common/keyboards';
import { IFavoriteService } from './services/telegram.favorite.service.interface';
import { IBanService } from './services/telegram.ban.service.interface';
import { ITrackService } from '../tracker/tracker.service.interface';

@injectable()
export class BotTracker implements IBotTracker {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(
		@inject(TYPES.ILoggerService) public loggerService: ILoggerService,
		@inject(TYPES.IConfigService) public configService: IConfigService,
		@inject(TYPES.IUserService) public userService: IUserService,
		@inject(TYPES.IBanService) public banService: IBanService,
		@inject(TYPES.IFavoriteService) public favoriteService: IFavoriteService,
		@inject(TYPES.ITrackService) public trackService: ITrackService,
	) {
		this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
		this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
		this.middleware();
	}

	middleware(): void {
		this.bot.use(async (ctx, next) => {
			const result = await userController(ctx, this.userService);
			if (result) next();
		});
	}

	init(): void {
		this.commands = [
			new StartCommand(this.bot, this.userService),
			new HelpCommand(
				this.bot,
				this.userService,
				this.banService,
				this.favoriteService,
				this.trackService,
			),
			new TrackCommands(this.bot, this.banService, this.favoriteService, this.trackService),
		];
		for (const command of this.commands) command.handle();
		this.bot.launch();
		this.loggerService.log('Бот запущен');
	}

	async sendMessage(chat: number, message: string): Promise<boolean> {
		try {
			await this.bot.telegram.sendMessage(chat, message, {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup: trackKBDefault,
			});
		} catch (error: any) {
			this.loggerService.error(`${error['response'].data.description}`);
			return false;
		}
		return true;
	}
}
