import { BanTrack, BanType, Track } from '@prisma/client';
import { inject } from 'inversify';
import { IPrismaService } from '../../database/prisma.interface';
import { ILoggerService } from '../../logger/logger.interface';
import { TYPES } from '../../types';

export class BanService implements BanService {
	constructor(
		@inject(TYPES.IPrismaService) private readonly prismaService: IPrismaService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {}

	async checkBanByAuthor(userId: number, trackId: number): Promise<BanTrack | null> {
		const tracks = await this.prismaService.client.banTrack.findMany({
			where: {
				userId,
				banType: BanType.ByAuthor,
			},
			select: {
				track: true,
			},
		});
		if (!tracks) return null;
		tracks.some((track) => track.track.author === );
	}

	async checkBanByCategory(userId: number, trackId: number): Promise<BanTrack | null> {
		return this.prismaService.client.banTrack.findFirst({
			where: {
				userId,
				banType: BanType.ByCategory,
			},
		});
	}

	async checkBanBy(userId: number, trackId: number, banType: BanType): Promise<BanTrack | null> {
		return this.prismaService.client.banTrack.findFirst({
			where: {
				userId,
				trackId,
				banType,
			},
		});
	}

	async create(userId: number, trackId: number, banType: BanType): Promise<BanTrack> {
		this.loggerService.log(`Пост ${trackId} добавлен в бан`);
		return this.prismaService.client.banTrack.create({
			data: { userId, trackId, banType },
		});
	}

	async delete(id: number): Promise<BanTrack> {
		this.loggerService.log(`Пост ${id} удален из бана`);
		return this.prismaService.client.banTrack.delete({
			where: { id },
		});
	}

	async find(id: number): Promise<BanTrack | null> {
		return this.prismaService.client.banTrack.findUnique({
			where: { id },
		});
	}
}
