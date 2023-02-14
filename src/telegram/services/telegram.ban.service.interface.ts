import { BanTrack, BanType } from '@prisma/client';

export interface IBanService {
	checkBanByAuthor: (userId: number, trackId: number) => Promise<BanTrack | null>;
	checkBanByCategory: (userId: number, trackId: number) => Promise<BanTrack | null>;
	create: (userId: number, trackId: number, banType: BanType) => Promise<BanTrack>;
	delete: (id: number) => Promise<BanTrack>;
	find: (id: number) => Promise<BanTrack | null>;
}
