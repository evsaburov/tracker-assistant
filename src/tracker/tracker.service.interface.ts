import { Track } from './track.entity';
import { Track as TrackModel } from '@prisma/client';

export interface ITrackService {
	getData: () => Promise<Track[]>;
	update: () => Promise<void>;
	getPicture: (text: string) => Promise<String>;
	getLastTracks: (amount: number, delta: number) => Promise<TrackModel[] | null>;
}
