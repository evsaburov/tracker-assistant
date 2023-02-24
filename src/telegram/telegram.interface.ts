import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export interface IBotTracker {
	init(): void;
	sendMessage(chat: number, message: string): Promise<boolean>;
}
