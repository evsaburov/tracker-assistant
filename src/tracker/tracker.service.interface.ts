import { Track } from './track.entity';

export interface ITrackService {
	getData: () => Promise<Track[]>;
	update: () => Promise<void>;
	getPicture: (text: string) => Promise<String>;
}
