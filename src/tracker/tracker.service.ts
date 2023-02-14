import { TYPES } from '../types';
import { parseString } from 'xml2js';
import { ConfigService } from '../config/config.service';
import { ILoggerService } from '../logger/logger.interface';
import { ITrackRepository } from './track.repository.interface';
import { ITrackService } from './tracker.service.interface';
import { Track as TrackModel } from '@prisma/client';
import { Track } from './track.entity';
import { inject, injectable } from 'inversify';
import axios from 'axios';
import 'reflect-metadata';

@injectable()
export class TrackService implements ITrackService {
	constructor(
		@inject(TYPES.ITrackRepository) private readonly trackRepository: ITrackRepository,
		@inject(TYPES.IConfigService) private readonly configService: ConfigService,
		@inject(TYPES.ILoggerService) private readonly LoggerService: ILoggerService,
	) {}

	getLastTracks(amount: number, delta: number): Promise<TrackModel[]> {
		return this.trackRepository.getLast(amount, delta);
	}

	async getPicture(text: string): Promise<string> {
		// 	const searchText = text.replace(/\[.*?\]/g, '');
		// 	const url = this.configService.get('IMG_SERVICE_URL') + encodeURI(searchText);
		// 	const { data, status } = await axios.get(url);
		// 	if (status !== 200) throw new Error('Ошибка при получении картинки с сервера Yandex');
		// 	const { window } = new JSDOM(data);
		// 	if (window === null) throw new Error('Ошибка парсинга');
		// 	const objImg = window.document.querySelector('.serp-item__link img');
		// 	if (objImg === null) throw new Error('Не удалось получить ссылку из ответа');
		return 'img';
	}

	async update(): Promise<void> {
		this.LoggerService.log('Получение данных из ресурса');
		const tracks = await this.getData();
		tracks.forEach(async (track) => await this.trackRepository.create(track));
	}

	async getData(): Promise<Track[]> {
		const address = this.configService.get('TRACKER_URL');
		const url = typeof address === 'number' ? address.toString() : address;
		const { data, status } = await axios.get(url);
		if (status !== 200)
			this.LoggerService.error('[TrackService] Ошибка при получении данных с трекера');
		return await this.parseData(data);
	}

	async parseData(data: string): Promise<Track[]> {
		const tracks = new Array<Track>();
		parseString(data, async (error, result): Promise<void> => {
			if (error !== null) throw this.LoggerService.error('[XMLService] Ошибка парсинга');
			for (const track of result.feed['entry']) {
				tracks.push(
					new Track(
						track['id'],
						track['link'],
						track['updated'],
						track['title'],
						track['author'],
						track['category'],
					),
				);
			}
		});
		return tracks;
	}

	async sendMessage(botId: number, chat: number, message: string): Promise<void> {}
}
