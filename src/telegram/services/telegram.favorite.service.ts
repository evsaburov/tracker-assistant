import { FavoriteTrack } from '@prisma/client';
import { inject } from 'inversify';
import { IPrismaService } from '../../database/prisma.interface';
import { ILoggerService } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IFavoriteService } from './telegram.ban.service.interface';

export class FavoriteService implements IFavoriteService {
	constructor(
		@inject(TYPES.IPrismaService) private readonly prismaService: IPrismaService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {}

	async findUserFavorite(userId: number, trackId: number): Promise<FavoriteTrack[]> {
		return this.prismaService.client.favoriteTrack.findMany({
			where: {
				userId,
				trackId,
			},
		});
	}

	async findByUserAndTrack(userId: number, trackId: number): Promise<FavoriteTrack | null> {
		return this.prismaService.client.favoriteTrack.findFirst({
			where: {
				userId,
				trackId,
			},
		});
	}

	async create(userId: number, trackId: number): Promise<FavoriteTrack> {
		this.loggerService.log(`Пост ${userId} добавлен в избранное `);
		return this.prismaService.client.favoriteTrack.create({
			data: { userId: userId, trackId: trackId },
		});
	}

	async delete(id: number): Promise<FavoriteTrack> {
		return this.prismaService.client.favoriteTrack.delete({
			where: { id },
		});
	}

	async find(id: number): Promise<FavoriteTrack | null> {
		return this.prismaService.client.favoriteTrack.findUnique({
			where: { id },
		});
	}
}
