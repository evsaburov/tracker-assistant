import { BanTrack, BanType, FavoriteTrack, Track } from '@prisma/client';
import { Telegraf } from 'telegraf';
import { ITrackService } from '../../tracker/tracker.service.interface';
import { IUserService } from '../../users/user.service.interface';
import { trackActionKB, trackKBCancel, trackKBFavorite } from '../common/keyboards';
import { IBotContext } from '../context/context.interface';
import { IBanService } from '../services/telegram.ban.service.interface';
import { IFavoriteService } from '../services/telegram.favorite.service.interface';
import { Command } from './commands';

export class TrackCommands extends Command {
	constructor(
		bot: Telegraf<IBotContext>,
		private readonly banService: IBanService,
		private readonly favoriteService: IFavoriteService,
		private readonly trackService: ITrackService,
	) {
		super(bot);
	}

	getIdPostFromMessage(text: string): number | null {
		const match = text.match(/id:[\d]+/gi);
		const matchText = match?.[0] ? match[0] : null;
		if (matchText === null) return null;
		const matchInt = matchText.split(':')[1] ?? null;
		if (matchInt === null) return null;
		return parseInt(matchInt);
	}

	handle(): void {
		this.bot.action('banByCategory', async (ctx) => {
			if (ctx.callbackQuery.message === undefined) return;
			if (!('text' in ctx.callbackQuery.message)) return;
			const ctxMessageText = ctx.callbackQuery.message.text;
			const id = this.getIdPostFromMessage(ctxMessageText);
			if (id === null) return;
			const ban = await this.createBan(ctx.session.userId, id, BanType.ByCategory);
			if (ban) {
				await ctx.answerCbQuery('Вам больше не будет приходить даная категория');
			} else {
				await ctx.answerCbQuery('Возникла ошибка при добавлении категории в бан');
			}
			await ctx.editMessageReplyMarkup(trackKBCancel);
		});

		this.bot.action('banByAuthor', async (ctx) => {
			if (ctx.callbackQuery.message === undefined) return;
			if (!('text' in ctx.callbackQuery.message)) return;
			const ctxMessageText = ctx.callbackQuery.message.text;
			const id = this.getIdPostFromMessage(ctxMessageText);
			if (id === null) return;
			const ban = await this.createBan(ctx.session.userId, id, BanType.ByAuthor);
			if (ban) {
				await ctx.answerCbQuery('Вам больше не будет приходить посты этого автора');
			} else {
				await ctx.answerCbQuery('Возникла ошибка при добавлении категории в бан');
			}
			await ctx.editMessageReplyMarkup(trackKBCancel);
		});

		this.bot.action('favorite', async (ctx) => {
			if (ctx.callbackQuery.message === undefined) return;
			if (!('text' in ctx.callbackQuery.message)) return;
			const ctxMessageText = ctx.callbackQuery.message.text;
			const id = this.getIdPostFromMessage(ctxMessageText);
			if (id === null) return;
			const fan = await this.createFavorite(ctx.session.userId, id);
			if (fan) {
				await ctx.answerCbQuery('Пост добавлен в избранное');
			} else {
				await ctx.answerCbQuery('Возникла ошибка при добавлении категории в избранное');
			}
			await ctx.editMessageReplyMarkup(trackKBFavorite);
		});

		this.bot.action('actions', async (ctx) => {
			await ctx.editMessageReplyMarkup(trackActionKB);
		});

		this.bot.action('delFavorite', async (ctx) => {
			if (ctx.callbackQuery.message === undefined) return;
			if (!('text' in ctx.callbackQuery.message)) return;
			const ctxMessageText = ctx.callbackQuery.message.text;
			const trackId = this.getIdPostFromMessage(ctxMessageText);
			if (trackId === null) return;
			const deletedTrack = await this.delFavorite(ctx.session.userId, trackId);
			if (deletedTrack) {
				await ctx.answerCbQuery('Пост удален из избранное');
			} else {
				await ctx.answerCbQuery('Возникла ошибка при удалении из избраненного');
			}
			await ctx.deleteMessage();
		});

		this.bot.action('actions', async (ctx) => {
			await ctx.editMessageReplyMarkup(trackActionKB);
		});
	}

	async createBan(userId: number, id: number, banType: BanType): Promise<BanTrack | null> {
		const track = await this.trackService.findTrackById(id);
		if (track === null) return null;
		const ban = await this.banService.create(userId, track.id, banType);
		if (ban === null) return null;
		return ban;
	}
	async createFavorite(userId: number, id: number): Promise<FavoriteTrack | null> {
		const track = await this.trackService.findTrackById(id);
		if (track === null) return null;
		const fan = await this.favoriteService.create(userId, track.id);
		if (fan === null) return null;
		return fan;
	}

	// async getIdFromMessage(messageText: string): number {}

	async delFavorite(userId: number, TrackId: number): Promise<FavoriteTrack | null> {
		const track = await this.favoriteService.findByUserAndTrack(userId, TrackId);
		if (track === null) return null;
		const deletedTrack = await this.favoriteService.delete(track.id);
		if (deletedTrack === null) return null;
		return deletedTrack;
	}
}
