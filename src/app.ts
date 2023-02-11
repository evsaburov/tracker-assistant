import { inject, injectable } from 'inversify';
import { ILoggerService } from './logger/logger.interface';
import { TYPES } from './types';
import { ITrackService } from './tracker/tracker.service.interface';
import { schedule } from 'node-cron';
import 'reflect-metadata';
import { IBotTracker } from './telegram/rutracker/telegram.interface';

@injectable()
export class App {
	constructor(
		@inject(TYPES.ILoggerService) private LoggerService: ILoggerService,
		@inject(TYPES.IBotTracker) private botTracker: IBotTracker,
		@inject(TYPES.ITrackService) private track: ITrackService,
	) {}

	init(): void {
		this.botTracker.init();
		schedule('0 * * * *', () => this.track.update());
		this.track.update();
		this.LoggerService.log('Приложение запущено');
	}
}
