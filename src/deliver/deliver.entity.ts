export class Deliver {
	readonly userId: number;
	readonly postId: number;
	readonly botId: number;

	constructor(user: number, post: number, botId: number) {
		this.userId = user;
		this.postId = post;
		this.botId = botId;
	}
}
