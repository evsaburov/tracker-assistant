import { FavoriteTrack } from '@prisma/client';

export interface IFavoriteService {
	findUserFavorite: (userId: number, trackId: number) => Promise<FavoriteTrack[]>;
	findByUserAndTrack: (userId: number, trackId: number) => Promise<FavoriteTrack | null>;
	create: (userId: number, trackId: number) => Promise<FavoriteTrack>;
	delete: (id: number) => Promise<FavoriteTrack>;
	find: (id: number) => Promise<FavoriteTrack | null>;
}
