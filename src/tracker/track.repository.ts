import { Deliver, Track as TrackModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../database/prisma.interface';
import { TYPES } from '../types';
import { Track } from './track.entity';
import { ITrackRepository } from './track.repository.interface';
import 'reflect-metadata';

@injectable()
export class TrackRepository implements ITrackRepository {
	constructor(@inject(TYPES.IPrismaService) readonly prismaService: IPrismaService) {}

	async create(track: Track): Promise<TrackModel> {
		return this.prismaService.client.track.upsert({
			where: { fk: track.fk },
			create: track,
			update: track,
		});
	}

	async find(id: number): Promise<TrackModel | null> {
		return this.prismaService.client.track.findFirst({ where: { id } });
	}

	async getLast(amount: number, delta: number): Promise<TrackModel[] | null> {
		return await this.prismaService.client.track.findMany({
			skip: amount,
			take: delta,
			orderBy: {
				updated_at: 'desc',
			},
		});
	}
}
