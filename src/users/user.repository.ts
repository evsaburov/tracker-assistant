import { Role, Status, User as UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.IPrismaService) readonly prismaService: PrismaService) {}

	async setStatus(userId: number, status: Status): Promise<UserModel> {
		return this.prismaService.client.user.update({
			where: {
				id: userId,
			},
			data: {
				status: status,
			},
		});
	}

	async create(user: User): Promise<UserModel> {
		return await this.prismaService.client.user.upsert({
			where: { chat: user.chat },
			create: user,
			update: user,
		});
	}
	async find(id: number): Promise<UserModel | null> {
		return await this.prismaService.client.user.findFirst({
			where: { id: id },
		});
	}
	async findByChat(chat: number): Promise<UserModel | null> {
		return await this.prismaService.client.user.findFirst({
			where: { chat: chat },
		});
	}
	async findActive(): Promise<UserModel[]> {
		return await this.prismaService.client.user.findMany({
			where: {
				role: Role.USER,
				status: Status.ACTIVE,
			},
		});
	}
}
