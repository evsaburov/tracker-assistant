import { ConfigService } from '../config/config.service';
import { ILogger } from '../logger/logger.interface';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { User as UserModel } from '@prisma/client';

export class UserService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly configService: ConfigService,
		private logger: ILogger,
	) {}

	async create(user: User): Promise<UserModel> {
		const createdUser = this.userRepository.create(user);
		if (createdUser === null) this.logger.error('Ошибка создания пользователя');
		return createdUser;
	}
	async find(id: number): Promise<UserModel | null> {
		const foundUser = this.userRepository.find(id);
		if (foundUser === null) this.logger.error('Пользователь не найден');
		return foundUser;
	}
	async findByTelegramId(id: number): Promise<UserModel | null> {
		const foundUser = this.userRepository.findByTelegramID(id);
		if (foundUser === null) this.logger.error('Пользователь не найден');
		return foundUser;
	}
}
