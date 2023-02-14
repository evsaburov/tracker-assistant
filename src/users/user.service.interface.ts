import { User } from './user.entity';
import { Status, User as UserModel } from '@prisma/client';

export class IUserService {
	create: (user: User) => Promise<UserModel>;
	find: (id: number) => Promise<UserModel | null>;
	findByChatId: (id: number) => Promise<UserModel | null>;
	activeUsers: () => Promise<UserModel[]>;
	setStatus: (userId: number, status: Status) => Promise<UserModel>;
}
