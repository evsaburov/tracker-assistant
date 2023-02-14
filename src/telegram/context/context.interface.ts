import { Context, Scenes } from 'telegraf';

export interface SessionData {
	courseLike: boolean;
	userId: number;
}

export interface IBotContext extends Context {
	session: SessionData;
}
