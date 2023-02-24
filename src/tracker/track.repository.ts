import { Track as TrackModel } from '@prisma/client';
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
		return await this.prismaService.client.track.upsert({
			where: { fk: track.fk },
			create: track,
			update: track,
		});
	}

	async delete(id: number): Promise<TrackModel> {
		return await this.prismaService.client.track.delete({ where: { id } });
	}

	async find(id: number): Promise<TrackModel | null> {
		return await this.prismaService.client.track.findFirst({ where: { id } });
	}
	async findByIds(ids: number[]): Promise<TrackModel[]> {
		return await this.prismaService.client.track.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	async getLast(amount: number, delta: number): Promise<TrackModel[]> {
		return await this.prismaService.client.track.findMany({
			skip: amount,
			take: delta,
			orderBy: {
				updated_at: 'desc',
			},
		});
	}
}
