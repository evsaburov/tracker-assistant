import { inject, injectable } from 'inversify';
import { ILoggerService } from './logger/logger.interface';
import { TYPES } from './types';
import { ITrackService } from './tracker/tracker.service.interface';
import { schedule } from 'node-cron';
import 'reflect-metadata';
import { IDeliverTrackService } from './deliver/deliver.track.service.interface';
import { IBotTracker } from './telegram/telegram.interface';

@injectable()
export class App {
	constructor(
		@inject(TYPES.ILoggerService) private LoggerService: ILoggerService,
		@inject(TYPES.IBotTracker) private botTracker: IBotTracker,
		@inject(TYPES.ITrackService) private track: ITrackService,
		@inject(TYPES.IDeliverTrackService) private deliverTrackService: IDeliverTrackService,
	) {}

	init(): void {
		this.botTracker.init();
		this.track.update();
		this.deliverTrackService.start();
		schedule('0 * * * *', () => this.track.update());
		schedule('* * * * *', () => this.deliverTrackService.start());
		this.LoggerService.log('Приложение запущено');
	}
}
