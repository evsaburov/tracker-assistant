import { User as UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(user: User): Promise<UserModel> {
		return this.prismaService.client.user.upsert({
			where: { telegramId: user.telegramId },
			create: user,
			update: user,
		});
	}
	async findByTelegramID(telegram_id: number): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: { telegramId: telegram_id },
		});
	}
	async find(id: number): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: { id: id },
		});
	}
}
