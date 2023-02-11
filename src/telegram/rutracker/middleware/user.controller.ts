import { Status } from '@prisma/client';
import { User } from '../../../users/user.entity';
import { IUserService } from '../../../users/user.service.interface';
import { IBotContext } from '../context/context.interface';

export const userController = async (
	ctx: IBotContext,
	userService: IUserService,
): Promise<boolean> => {
	if (!ctx.from) throw new Error('не удалось получить from из контекста');
	if (!ctx.from.first_name) throw new Error('не удалось получить first_name пользователя');
	if (!ctx.from.username) throw new Error('не удалось получить username пользователя');
	if (!ctx.from.id) throw new Error('не удалось получить chat id пользователя');
	if (!ctx.botInfo.id) throw new Error('не удалось получить bot id');

	const chatId = ctx.from.id;
	const botId = ctx.botInfo.id;
	const user = await userService.findByChatId(chatId);
	if (!user) {
		const userEntity = new User(chatId, botId, ctx.from.username, ctx.from.first_name);
		const user = await userService.create(userEntity);
	}
	if (user === null) throw new Error('не удалось создать пользователя');
	if (user.status === Status.BLOCKED) {
		await ctx.reply('Ваш чат заблокирован');
		return false;
	}
	return true;
};
