import { Track } from '../tracker/track.entity';
import { User } from '../users/user.entity';

export class Deliver {
	constructor(private readonly user: User, private readonly track: Track) {}
}
