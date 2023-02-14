import { Status } from '@prisma/client';
import { inject } from 'inversify';
import { Markup, Telegraf } from 'telegraf';
import { TYPES } from '../../types';
import { IUserService } from '../../users/user.service.interface';
import { IBotContext } from '../context/context.interface';
import { Command } from './commands.class';

export class HelpCommand extends Command {
	readonly userService: IUserService;
	constructor(bot: Telegraf<IBotContext>, userService: IUserService) {
		super(bot);
		this.userService = userService;
	}
	handle(): void {
		this.bot.help(async (ctx) => {
			console.log(ctx.session);
			await ctx.reply(
				'Вам доступно:',
				Markup.inlineKeyboard([
					[Markup.button.callback('Подписаться', 'subscribe')],
					[Markup.button.callback('Отписаться', 'unsubscribe')],
					[Markup.button.callback('Избранное', 'likes')],
					[Markup.button.callback('Настройки', 'settings')],
					[Markup.button.callback('Список блокировок', 'blocks')],
				]),
			);
		});
		this.bot.action('likes', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
		this.bot.action('subscribe', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.ACTIVE);
			ctx.editMessageText('Подписка активирована');
		});
		this.bot.action('unsubscribe', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.STOP);
			ctx.editMessageText('Подписка отключена');
		});
		this.bot.action('settings', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
		this.bot.action('blocks', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
	}
}
