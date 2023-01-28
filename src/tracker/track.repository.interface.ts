import { Track as TrackModel } from '@prisma/client';
import { Track } from './track.entity';

export interface ITrackRepository {
	create: (track: Track) => Promise<TrackModel>;
	find: (id: number) => Promise<TrackModel | null>;
}
