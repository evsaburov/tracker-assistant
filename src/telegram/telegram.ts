import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';
import { Command } from './commands/commands.class';
import { StartCommand } from './commands/start.command';
import LocalSession from 'telegraf-session-local';
import { IBotTelegram } from './telegram.interface';
import { HelpCommand } from './commands/help.command';

export class BotTelegram implements IBotTelegram {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(private readonly logger: ILogger, private readonly configService: IConfigService) {
		this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
		this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
	}

	init(): void {
		this.commands = [new StartCommand(this.bot), new HelpCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}
		this.bot.launch();
		this.logger.log(`bot launched`);
	}
}
