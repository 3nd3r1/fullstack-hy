export class BadInputError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "BadInputError";
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
