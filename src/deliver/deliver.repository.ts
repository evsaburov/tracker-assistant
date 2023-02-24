import { Deliver } from './deliver.entity';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../database/prisma.interface';
import { TYPES } from '../types';
import { IDeliverRepository } from './deliver.repository.interface';
import { DeliverTrack } from '@prisma/client';
@injectable()
export class DeliverRepository implements IDeliverRepository {
	constructor(@inject(TYPES.IPrismaService) private readonly prismaService: IPrismaService) {}

	async create(deliver: Deliver): Promise<DeliverTrack> {
		return await this.prismaService.client.deliverTrack.create({ data: deliver });
	}

	async find(userId: number, trackId: number): Promise<DeliverTrack | null> {
		return await this.prismaService.client.deliverTrack.findFirst({
			where: { userId, trackId },
		});
	}
}
