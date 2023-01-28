import { TrackerResponse } from './dto/tracker-response.dto';

export interface ITrackService {
	getData: () => Promise<TrackerResponse>;
}
