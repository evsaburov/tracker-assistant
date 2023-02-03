import { User } from '../users/user.entity';
import { Post } from './deliver.entity.interface';

export class Deliver {
	private readonly user: User;
	private readonly track: Post;

	constructor(user: User, post: Post) {
		this.user = user;
		this.track = post;
	}
}
