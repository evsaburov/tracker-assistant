import { FavoriteTrack, Status, Track } from '@prisma/client';
import { inject } from 'inversify';
import { Markup, Telegraf } from 'telegraf';
import { ITrackService } from '../../tracker/tracker.service.interface';
import { IUserService } from '../../users/user.service.interface';
import { delTrackKBFavoriteCard, trackActionKB } from '../common/keyboards';
import { IBotContext } from '../context/context.interface';
import { IBanService } from '../services/telegram.ban.service.interface';
import { IFavoriteService } from '../services/telegram.favorite.service.interface';
import { Command } from './commands';

export class HelpCommand extends Command {
	constructor(
		bot: Telegraf<IBotContext>,
		private readonly userService: IUserService,
		private readonly banService: IBanService,
		private readonly favoriteService: IFavoriteService,
		private readonly trackService: ITrackService,
	) {
		super(bot);
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
					[Markup.button.callback('Заблокировано', 'blocks')],
				]),
			);
		});
		this.bot.action('likes', async (ctx) => {
			if (ctx.from?.id === undefined) return;
			if (ctx.callbackQuery.message === undefined) return;
			if (!('text' in ctx.callbackQuery.message)) return;
			const ctxUserId = ctx.session.userId;
			const favorites = await this.favoriteService.findFavorites(ctxUserId);
			if (favorites.length === 0) {
				await ctx.answerCbQuery('Нет постов в избранном');
				return;
			}
			favorites.forEach(async (fan) => {
				const mess = await this.createMessageFavorites(fan);
				if (mess === null) {
					return;
				}
				await ctx.sendMessage(mess, {
					parse_mode: 'HTML',
					disable_web_page_preview: true,
					reply_markup: delTrackKBFavoriteCard,
				});
			});
		});
		this.bot.action('subscribe', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.ACTIVE);
			ctx.answerCbQuery('Подписка активирована');
		});
		this.bot.action('unsubscribe', async (ctx) => {
			await this.userService.setStatus(ctx.session.userId, Status.STOP);
			ctx.answerCbQuery('Подписка отключена');
		});
		this.bot.action('settings', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Круто');
		});
		this.bot.action('blocks', (ctx) => {
			ctx.session.courseLike = true;
			ctx.editMessageText('Блокировки');
		});
	}

	async createMessageFavorites(fans: FavoriteTrack): Promise<string | null> {
		const track = await this.trackService.findTrackById(fans.trackId);
		if (track === null) return null;
		return `❤ Избранное\n\n${track.title} - <a href='${track.link}'>[Link]</a>[id:${track.id}]`;
	}
}
