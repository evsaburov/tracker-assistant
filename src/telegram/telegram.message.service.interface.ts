export class ITelegramMessageService {
	sendMessage: (botToken: number, userChat: number, message: String) => Promise<void>;
}
