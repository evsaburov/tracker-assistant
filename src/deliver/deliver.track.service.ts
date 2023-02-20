import { User, Track as TrackModel, BanType } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.interface';
import { IBanService } from '../telegram/services/telegram.ban.service.interface';
import { IBotTracker } from '../telegram/telegram.interface';
import { ITrackService } from '../tracker/tracker.service.interface';
import { TYPES } from '../types';
import { IUserService } from '../users/user.service.interface';
import { Deliver } from './deliver.entity';
import { IDeliverRepository } from './deliver.repository.interface';
import { IDeliverTrackService } from './deliver.track.service.interface';
@injectable()
export class DeliverTrackService implements IDeliverTrackService {
	constructor(
		@inject(TYPES.IUserService) readonly userService: IUserService,
		@inject(TYPES.ITrackService) readonly trackService: ITrackService,
		@inject(TYPES.IDeliverRepository) readonly deliverRepository: IDeliverRepository,
		@inject(TYPES.ILoggerService) readonly loggerService: ILoggerService,
		@inject(TYPES.IBanService) readonly banService: IBanService,
		@inject(TYPES.IBotTracker) readonly botTracker: IBotTracker,
	) {}

	async start(): Promise<void> {
		const users = await this.userService.activeUsers();
		users.forEach(async (user) => {
			const track = await this.getPostForUser(user);
			if (track === null) return;
			const text = this.prepareTextForPost(track);
			const IsSend = await this.botTracker.sendMessage(user.chat, text);
			if (IsSend) {
				const deliver = new Deliver(user.id, track.id);
				await this.deliverRepository.create(deliver);
			}
		});
	}

	async getPostForUser(user: User): Promise<TrackModel> {
		const post: TrackModel[] = [];
		for (let step = 1; step < 100; step++) {
			const tracks = await this.getLastPost(step, 1);
			tracks.forEach(async (track) => {
				const isSend = await this.checkPost(user, track);
				if (!isSend) return;
				this.loggerService.log(`Выбран пост ${track.id} для ${user.first_name}`);
				post.push(track);
			});
			if (post.length == 0) continue;
			break;
		}
		return post[0];
	}

	async checkPost(user: User, track: TrackModel): Promise<boolean> {
		this.loggerService.log(`проверка поста ${track.id} для пользователя ${user.username}`);
		const deliver = await this.deliverRepository.find(user.id, track.id);
		if (deliver) {
			this.loggerService.log(`Уже отправлялся ${track.id} для пользователя ${user.username}`);
			return false;
		}

		const isAuthorInBan = await this.banService.checkBanByAuthor(user.id, track.author);
		if (isAuthorInBan) {
			this.loggerService.log(
				`Блокирован по категории ${track.id} для пользователя ${user.username}`,
			);
			return false;
		}
		const isCategoryInBan = await this.banService.checkBanByCategory(user.id, track.categoryCode);
		if (isCategoryInBan) {
			this.loggerService.log(
				`Блокирован по автору пост ${track.id} для пользователя ${user.username}`,
			);
			return false;
		}
		this.loggerService.log(`Прошел проверку пост ${track.id} для пользователя ${user.username}`);
		return true;
	}

	async getLastPost(skip: number, take: number): Promise<TrackModel[]> {
		return await this.trackService.getLastTracks(skip, take);
	}

	prepareTextForPost(track: TrackModel): string {
		return (
			`<b>Категория: </b>${track.category}\n\n` +
			`<b>${track.title}</b>\n\n` +
			`<a href='${track.link}'>[Link]</a>[${track.author}][id:${track.id}]`
		);
	}
}
