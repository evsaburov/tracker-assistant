export class ITelegramMessageService {
	sendMessage: (userChat: number, message: string) => Promise<boolean>;
}
