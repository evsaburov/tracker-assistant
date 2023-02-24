import { injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

@injectable()
export abstract class Command {
	constructor(public bot: Telegraf<IBotContext>) {}
	abstract handle(): void;
}
