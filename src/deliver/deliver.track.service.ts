import { User, Track as TrackModel, BanType } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.interface';
import { IBanService } from '../telegram/services/telegram.ban.service.interface';
import { ITelegramMessageService } from '../telegram/services/telegram.message.service.interface';
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
		@inject(TYPES.ITelegramMessageService) readonly messageService: ITelegramMessageService,
		@inject(TYPES.ILoggerService) readonly loggerService: ILoggerService,
		@inject(TYPES.IBanService) readonly banService: IBanService,
	) {}

	async start(): Promise<void> {
		const users = await this.userService.activeUsers();
		users.forEach(async (user) => {
			const track = await this.getPostForUser(user);
			if (track === null) return;
			const text = this.prepareTextForPost(track);
			const IsSend = await this.messageService.sendMessage(user.chat, text);
			if (IsSend) {
				const deliver = new Deliver(user.id, track.id);
				await this.deliverRepository.create(deliver);
			}
		});
	}

	async getPostForUser(user: User): Promise<TrackModel> {
		const newPosts: Array<TrackModel> = [];
		let skip = 0;
		const take = 3;
		do {
			const tracks = await this.getLastPost(skip, take);
			tracks.forEach(async (track) => {
				const postSendedForUser = await this.checkPost(user, track);
				if (!postSendedForUser) {
					newPosts.push(track);
					this.loggerService.log(`Выбран пост ${track.id} для ${user.first_name}`);
				}
			});
			skip += take;
		} while (!newPosts.length);
		return newPosts[0];
	}

	async getLastPost(skip: number, take: number): Promise<TrackModel[]> {
		return await this.trackService.getLastTracks(skip, take);
	}

	async checkPost(user: User, track: TrackModel): Promise<boolean> {
		const deliver = await this.deliverRepository.find(user.id, track.id);
		this.loggerService.log(`проверка поста ${!!deliver?.id}`);
		if (deliver === null) return false;
		const authorInBan = await this.banService.checkBanByAuthor(user.id, track.id);
		if (authorInBan) return false;
		const categoryInBan = await this.banService.checkBanByCategory(user.id, track.id);
		if (categoryInBan) return false;
		return true;
	}

	prepareTextForPost(track: TrackModel): string {
		return (
			`<b>${track.category}</b>\n\n` +
			`<b>${track.title}</b>\n` +
			`<a href='${track.link}'>[Link]</a>[${track.author}][${track.updated.toDateString()}]`
		);
	}
}
