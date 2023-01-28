export class User {
	private readonly _name: string;
	private readonly _status: Status;
	private readonly _role: Role;
	private readonly _telegramId: number;

	constructor(name: string, telegram: number) {
		this._name = name;
		this._status = Status.ACTIVE;
		this._role = Role.USER;
		this._telegramId = telegram;
	}

	public get name(): string {
		return this._name;
	}
	public get status(): Status {
		return this._status;
	}
	public get role(): Role {
		return this._role;
	}
	public get telegramId(): number {
		return this._telegramId;
	}
}
