export class Deliver {
	readonly userId: number;
	readonly trackId: number;

	constructor(user: number, post: number) {
		this.userId = user;
		this.trackId = post;
	}
}
