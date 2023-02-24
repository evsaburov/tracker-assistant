import { Track as TrackModel } from '@prisma/client';
import { Track } from './track.entity';

export interface ITrackRepository {
	create: (track: Track) => Promise<TrackModel>;
	delete: (id: number) => Promise<TrackModel>;
	find: (id: number) => Promise<TrackModel | null>;
	getLast: (amount: number, delta: number) => Promise<TrackModel[]>;
	findByIds(ids: number[]): Promise<TrackModel[]>;
}
