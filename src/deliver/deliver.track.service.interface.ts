import { Track, User } from '@prisma/client';

export interface IDeliverTrackService {
	start: () => Promise<void>;
	getPostForUser: (user: User) => Promise<Track>;
	checkPost: (user: User, track: Track) => Promise<boolean>;
	getLastPost: (skip: number, take: number) => Promise<Track[]>;
}
