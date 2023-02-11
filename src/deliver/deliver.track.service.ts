import { Track, User } from '@prisma/client';
import { inject } from 'inversify';
import { ITelegramMessageService } from '../telegram/telegram.message.service.interface';
import { BOTID } from '../telegram/types';
import { ITrackService } from '../tracker/tracker.service.interface';
import { TYPES } from '../types';
import { IUserService } from '../users/user.service.interface';
import { IDeliverRepository } from './deliver.repository.interface';
import { IDeliverService } from './deliver.service.interface';

export class DeliverTrackService implements IDeliverService {
	private readonly botId = BOTID.RUTRACKER;
	constructor(
		@inject(TYPES.IUserService) readonly userService: IUserService,
		@inject(TYPES.ITrackService) readonly trackService: ITrackService,
		@inject(TYPES.IDeliverRepository) readonly deliverRepository: IDeliverRepository,
		@inject(TYPES.ITelegramMessageService) readonly messageService: ITelegramMessageService,
	) {}

	async init(): Promise<void> {
		const users = await this.userService.usersByBot(this.botId);
		if (users === null) throw new Error('Нет пользователей для отправки постов');
		users.forEach(async (user) => {
			const post = await this.getPostForUser(user);
			const text = this.prepareTextForPost(post);
			if (text !== null) this.messageService.sendMessage(this.botId, user.chat, text);
		});
	}

	async getPostForUser(user: User): Promise<Track | null> {
		let trackForUser = null;
		do {
			const tracks = await this.getLastPost();
			if (tracks === null) throw new Error('Нет постов для пользователя');
			tracks?.forEach(async (track) => {
				const isNewForUser = await this.checkPost(user, track);
				if (isNewForUser) trackForUser = track;
			});
		} while (!trackForUser);
		return trackForUser;
	}

	async getLastPost(): Promise<Track[] | null> {
		const skip = 0;
		const take = 5;
		return await this.trackService.getLastTracks(skip, take);
	}

	async checkPost(user: User, track: Track): Promise<boolean> {
		const deliver = await this.deliverRepository.find(user.id, this.botId, track.id);
		if (deliver !== null) {
			return true;
		} else {
			return false;
		}
	}

	prepareTextForPost(text: Track | null): String | null {
		if (text === null) {
			return null;
		} else {
			return JSON.stringify(text).toString();
		}
	}
}
