import { Status } from '@prisma/client';
import { Markup, Telegraf } from 'telegraf';
import { IUserService } from '../../users/user.service.interface';
import { IBotContext } from '../context/context.interface';
import { Command } from './commands';
import { GREETINGS } from '../common/constants';
import { inject } from 'inversify';
import { TYPES } from '../../types';

export class StartCommand extends Command {
	constructor(bot: Telegraf<IBotContext>, private userService: IUserService) {
		super(bot);
	}
	handle(): void {
		this.bot.start(async (ctx) => {
			console.log(ctx.session);
			await ctx.reply(
				GREETINGS,
				Markup.inlineKeyboard([
					Markup.button.callback('👍 Подписаться', 'start'),
					Markup.button.callback('👎 В другой раз', 'stop'),
				]),
			);
		});
		this.bot.action('start', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.ACTIVE);
			ctx.editMessageText('😊');
		});
		this.bot.action('stop', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('😞');
		});
	}
}
