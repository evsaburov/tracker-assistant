import { User } from './user.entity';
import { Status, User as UserModel } from '@prisma/client';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	findByChat: (telegram_id: number) => Promise<UserModel | null>;
	find: (id: number) => Promise<UserModel | null>;
	findActive: () => Promise<UserModel[]>;
	setStatus: (userId: number, status: Status) => Promise<UserModel>;
}
