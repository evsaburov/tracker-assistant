import { BanTrack, BanType } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../../database/prisma.interface';
import { ILoggerService } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IBanService } from './telegram.ban.service.interface';
@injectable()
export class BanService implements IBanService {
	constructor(
		@inject(TYPES.IPrismaService) private readonly prismaService: IPrismaService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {}

	async getBansByCategory(userId: number): Promise<string[]> {
		const bans = await this.prismaService.client.banTrack.findMany({
			where: {
				userId,
				banType: BanType.ByCategory,
			},
			include: {
				track: true,
			},
			orderBy: {
				id: 'desc',
			},
			skip: 0,
			take: 100,
		});
		const categories = bans.map((ban) => ban.track.category);
		const setCategory = new Set(...categories);
		return [...setCategory];
	}

	async delByCategory(category: string): Promise<void> {
		const bans = await this.prismaService.client.banTrack.findMany({
			where: {
				banType: BanType.ByCategory,
			},
			include: { track: true },
		});
		const bansCategory = bans.filter((ban) => ban.track.category === category);
		bansCategory.forEach(async (ban) => {
			await this.prismaService.client.banTrack.delete({
				where: {
					id: ban.id,
				},
			});
		});
	}

	async delByAuthor(author: string): Promise<void> {
		const bans = await this.prismaService.client.banTrack.findMany({
			where: {
				banType: BanType.ByAuthor,
			},
			include: { track: true },
		});
		const bansAuthor = bans.filter((ban) => ban.track.category === author);
		bansAuthor.forEach(async (ban) => {
			await this.prismaService.client.banTrack.delete({
				where: {
					id: ban.id,
				},
			});
		});
	}

	async checkBanByAuthor(userId: number, author: string): Promise<boolean> {
		const tracks = await this.prismaService.client.banTrack.findMany({
			where: {
				userId,
				banType: BanType.ByAuthor,
			},
			include: {
				track: true,
			},
		});
		return tracks.some((track) => {
			track.track.author === author;
		});
	}

	async checkBanByCategory(userId: number, categoryCode: string): Promise<boolean> {
		const tracks = await this.prismaService.client.banTrack.findMany({
			where: {
				userId,
				banType: BanType.ByCategory,
			},
			include: {
				track: true,
			},
		});
		return tracks.some((track) => {
			track.track.categoryCode === categoryCode;
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
