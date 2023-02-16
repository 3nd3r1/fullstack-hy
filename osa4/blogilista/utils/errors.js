class BadRequest extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
	}
}

class NotFound extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 404;
	}
}

class BadAuth extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 401;
	}
}

module.exports = { BadRequest, NotFound, BadAuth };
