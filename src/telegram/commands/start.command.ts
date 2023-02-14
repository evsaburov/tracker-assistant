import { Status } from '@prisma/client';
import { Markup, Telegraf } from 'telegraf';
import { IUserService } from '../../users/user.service.interface';
import { IBotContext } from '../context/context.interface';
import { Command } from './commands.class';
import { HELLO } from './constants';

export class StartCommand extends Command {
	readonly userService: IUserService;
	constructor(bot: Telegraf<IBotContext>, userService: IUserService) {
		super(bot);
		this.userService = userService;
	}
	handle(): void {
		this.bot.start(async (ctx) => {
			console.log(ctx.session);
			await ctx.reply(HELLO);
			await ctx.reply(
				'Начать получать новости?',
				Markup.inlineKeyboard([
					[Markup.button.callback('👍 Старт', 'start')],
					[Markup.button.callback('👍 В другой раз', 'stop')],
				]),
			);
		});
		this.bot.action('start', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.ACTIVE);
			ctx.editMessageText('Подписка активирована');
		});
		this.bot.action('stop', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Как же так 😞');
		});
	}
}
