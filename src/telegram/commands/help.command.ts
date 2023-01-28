import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './commands.class';
import { HELLO } from './constants';

export class HelpCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}
	handle(): void {
		this.bot.help(async (ctx) => {
			console.log(ctx.session);
			await ctx.reply(
				'Вам доступно:',
				Markup.inlineKeyboard([
					[Markup.button.callback('Начать получать новости', 'start')],
					[Markup.button.callback('Остановить получение новостей', 'stop')],
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
		this.bot.action('start', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
		this.bot.action('stop', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
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
