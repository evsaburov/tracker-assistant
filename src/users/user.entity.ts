import { Role, Status } from '@prisma/client';
export class User {
	readonly chat: number;
	readonly username: string;
	readonly first_name: string;
	readonly status: Status;
	readonly role: Role;

	constructor(chat: number, name: string, first_name: string) {
		this.chat = chat;
		this.username = name;
		this.first_name = first_name;
		this.status = Status.ACTIVE;
		this.role = Role.USER;
	}
}
