import { ILoggerService } from '../logger/logger.interface';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { User as UserModel } from '@prisma/client';
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
		const createdUser = await this.userRepository.create(user);
		if (createdUser === null) this.logger.error('Ошибка создания пользователя');
		return createdUser;
	}

	async find(id: number): Promise<UserModel | null> {
		const foundUser = this.userRepository.find(id);
		if (foundUser === null) this.logger.error('Пользователь не найден');
		return foundUser;
	}
	async findByChatId(id: number): Promise<UserModel | null> {
		const foundUser = this.userRepository.findByChat(id);
		if (foundUser === null) this.logger.error('Пользователь не найден');
		return foundUser;
	}

	async usersByBot(botId: number): Promise<UserModel[] | null> {
		const foundUsers = this.userRepository.findByBot(botId);
		if (foundUsers === null) this.logger.error('Пользователи не найдены');
		return foundUsers;
		// !!!!!!!
	}
}
