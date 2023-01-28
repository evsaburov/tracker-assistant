import { User } from './user.entity';
import { User as UserModel } from '@prisma/client';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	findByTelegramID: (telegram_id: number) => Promise<UserModel | null>;
	find: (id: number) => Promise<UserModel | null>;
}
