import { DeliverTrack } from '@prisma/client';
import { Deliver } from './deliver.entity';

export interface IDeliverRepository {
	create: (deliver: Deliver) => Promise<DeliverTrack>;
	find: (userId: number, trackId: number) => Promise<DeliverTrack | null>;
}
