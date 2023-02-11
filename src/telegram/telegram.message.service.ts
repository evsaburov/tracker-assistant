import { ITelegramMessageService } from './telegram.message.service.interface';
import axios from 'axios';

export class TelegramMessageService implements ITelegramMessageService {
	readonly url = 'https://api.telegram.org/bot';

	async sendMessage(botToken: number, userChat: number, message: String): Promise<void> {
		const sendString = `${this.url}/${botToken}/sendMessage?${userChat}&text=`;
		await axios.get(`${sendString}${message}`);
	}
}
