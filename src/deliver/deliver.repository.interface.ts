import { Deliver as ModelDeliver } from '@prisma/client';
import { Deliver } from './deliver.entity';

export interface IDeliverRepository {
	create: (deliver: Deliver) => Promise<ModelDeliver | null>;
	find: (userId: number, botId: number, postId: number) => Promise<ModelDeliver | null>;
}
