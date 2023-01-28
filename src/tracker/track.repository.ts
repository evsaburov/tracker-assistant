import { Track as TrackModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { Track } from './track.entity';
import { ITrackRepository } from './track.repository.interface';

export class TrackRepository implements ITrackRepository {
	constructor(private readonly prismaService: PrismaService) {}

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
}
