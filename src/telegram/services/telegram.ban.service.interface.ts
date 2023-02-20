import { BanTrack, BanType, Track } from '@prisma/client';

export interface IBanService {
	checkBanByAuthor(userId: number, author: string): Promise<boolean>;
	checkBanByCategory(userId: number, categoryCode: string): Promise<boolean>;
	create(userId: number, trackId: number, banType: BanType): Promise<BanTrack>;
	delete(id: number): Promise<BanTrack>;
	find(id: number): Promise<BanTrack | null>;
	getBansByCategory(userId: number): Promise<string[]>;
	delByCategory(category: string): Promise<void>;
	delByAuthor(author: string): Promise<void>;
}
