import { ITelegramMessageService } from './telegram.message.service.interface';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILoggerService } from '../../logger/logger.interface';
import { IConfigService } from '../../config/config.service.interface';

@injectable()
export class TelegramMessageService implements ITelegramMessageService {
	readonly url = 'https://api.telegram.org/bot';
	readonly botToken: number;

	constructor(
		@inject(TYPES.ILoggerService) readonly loggerService: ILoggerService,
		@inject(TYPES.IConfigService) readonly configService: IConfigService,
	) {
		this.botToken = this.configService.get('BOT_TOKEN');
	}

	async sendMessage(userChat: number, message: string): Promise<boolean> {
		const mess = encodeURI(message);
		const sendString = `${this.url}${this.botToken}/sendMessage?chat_id=${userChat}&text=${mess}&parse_mode=HTML&disable_web_page_preview=true`;
		try {
			await axios.get(sendString);
		} catch (error: any) {
			this.loggerService.error(`${error['response'].data.description}`);
			return false;
		}
		this.loggerService.log(`Отправлено сообщение в чат ${userChat}`);
		return true;
	}
}
