import { Deliver, Track, User } from '@prisma/client';

export interface IDeliverService {
	init: () => Promise<void>;
	getPostForUser: (user: User) => Promise<Track | null>;
	checkPost: (user: User, track: Track) => Promise<boolean>;
	getLastPost: (user: User, track: Track) => Promise<Track[] | null>;
}
