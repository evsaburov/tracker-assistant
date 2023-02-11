import { Role, Status, User as UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.IPrismaService) private readonly prismaService: PrismaService) {}

	async create(user: User): Promise<UserModel> {
		return this.prismaService.client.user.upsert({
			where: { chat: user.chat },
			create: user,
			update: user,
		});
	}
	async findByChat(chat: number): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: { chat: chat },
		});
	}
	async find(id: number): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: { id: id },
		});
	}

	async findByBot(id: number): Promise<UserModel[] | null> {
		return this.prismaService.client.user.findMany({
			where: {
				botId: id,
				role: Role.USER,
				status: Status.ACTIVE,
			},
		});
	}
}
