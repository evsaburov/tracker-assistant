import { Deliver } from './deliver.entity';
import { inject } from 'inversify';
import { IPrismaService } from '../database/prisma.interface';
import { TYPES } from '../types';
import { IDeliverRepository } from './deliver.repository.interface';
import { Deliver as ModelDeliver } from '@prisma/client';

export class DeliverRepository implements IDeliverRepository {
	constructor(@inject(TYPES.IPrismaService) private readonly prismaService: IPrismaService) {}

	async create(deliver: Deliver): Promise<ModelDeliver | null> {
		return await this.prismaService.client.deliver.create({ data: deliver });
	}

	async find(userId: number, botId: number, postId: number): Promise<ModelDeliver | null> {
		return this.prismaService.client.deliver.findFirst({ where: { userId, botId, postId } });
	}
}
