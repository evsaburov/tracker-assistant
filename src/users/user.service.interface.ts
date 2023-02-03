import { User } from './user.entity';
import { User as UserModel } from '@prisma/client';

export class IUserService {
	create: (user: User) => Promise<UserModel>;
	find: (id: number) => Promise<UserModel | null>;
	findByChatId: (id: number) => Promise<UserModel | null>;
}
