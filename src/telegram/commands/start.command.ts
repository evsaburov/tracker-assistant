import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './commands.class';
import { HELLO } from './constants';

export class StartCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
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
		this.bot.action('start', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
		this.bot.action('stop', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Как же так 😞');
		});
	}
}
