import { ILoggerService } from '../logger/logger.interface';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { Status, User as UserModel } from '@prisma/client';
import { IUserService } from './user.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository,
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
	) {}

	async create(user: User): Promise<UserModel> {
		return await this.userRepository.create(user);
	}

	async setStatus(userId: number, status: Status): Promise<UserModel> {
		return await this.userRepository.setStatus(userId, status);
	}

	async find(id: number): Promise<UserModel | null> {
		return this.userRepository.find(id);
	}
	async findByChatId(id: number): Promise<UserModel | null> {
		return this.userRepository.findByChat(id);
	}

	async activeUsers(): Promise<UserModel[]> {
		return this.userRepository.findActive();
	}
}
