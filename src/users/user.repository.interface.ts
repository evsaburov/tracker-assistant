import { User } from './user.entity';
import { User as UserModel } from '@prisma/client';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	findByChat: (telegram_id: number) => Promise<UserModel | null>;
	find: (id: number) => Promise<UserModel | null>;
	findByBot: (id: number) => Promise<UserModel[] | null>;
}
