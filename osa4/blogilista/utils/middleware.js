const { BadAuth, BadRequest } = require("./errors");
const logger = require("./logger");
const config = require("./config");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
	logger.debug(
		`${request.method} ${request.path} --- Body: ${JSON.stringify(
			request.body
		)}`
	);
	next();
};

const tokenExtractor = (request, response, next) => {
	const auth = request.get("authorization");
	if (auth && auth.toLowerCase().startsWith("bearer ")) {
		request.token = auth.substring(7);
	}
	next();
};

const userExtractor = (request, response, next) => {
	if (!request.token) {
		throw new BadAuth("token is invalid");
	}

	const decodedToken = jwt.verify(request.token, config.SECRET);

	if (!decodedToken.id || !decodedToken.username) {
		throw new BadAuth("token is invalid");
	}

	request.user = { id: decodedToken.id, username: decodedToken.username };
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.statusCode) {
		return response.status(error.statusCode).send({ error: error.message });
	} else if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: "token is invalid" });
	}

	next(error);
};

module.exports = {
	requestLogger,
	tokenExtractor,
	userExtractor,
	unknownEndpoint,
	errorHandler,
};
