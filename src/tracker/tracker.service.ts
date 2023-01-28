import { Track } from './track.entity';
import { ITrackRepository } from './track.repository.interface';
import { ConfigService } from '../config/config.service';
import axios from 'axios';
import { ILogger } from '../logger/logger.interface';
import { parseString } from 'xml2js';

export class TrackService {
	constructor(
		private readonly trackRepository: ITrackRepository,
		private readonly configService: ConfigService,
		private logger: ILogger,
	) {}

	async update(): Promise<void> {
		const tracks = await this.getData();
		tracks.forEach(async (track) => {
			const upsertTrack = await this.trackRepository.create(track);
			console.log(upsertTrack.title);
		});
	}

	async getData(): Promise<Track[]> {
		const address = this.configService.get('TRACKER_URL');
		const url = typeof address === 'number' ? address.toString() : address;
		const { data, status } = await axios.get(url);
		if (status !== 200) this.logger.error('[TrackService] Ошибка при получении данных с трекера');
		return await this.parseData(data);
	}

	async parseData(data: string): Promise<Track[]> {
		const tracks = new Array<Track>();
		parseString(data, (error, result): void => {
			if (error !== null) throw this.logger.error('[XMLService] Ошибка парсинга');
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
}
