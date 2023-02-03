import { Role, Status } from '@prisma/client';
export class User {
	readonly chat: number;
	readonly botId: number;
	readonly username: string;
	readonly first_name: string;
	readonly status: Status;
	readonly role: Role;

	constructor(chat: number, botId: number, name: string, first_name: string) {
		this.chat = chat;
		this.botId = botId;
		this.username = name;
		this.first_name = first_name;
		this.status = Status.ACTIVE;
		this.role = Role.USER;
	}
}
