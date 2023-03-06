const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { BadAuth } = require("../utils/errors");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
	const { body } = request;

	const user = await User.findOne({ username: body.username });
	const loginIsCorrect = user
		? await bcrypt.compare(body.password, user.passwordHash)
		: false;

	if (!loginIsCorrect) {
		throw new BadAuth("Invalid username or password");
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, config.SECRET);

	response
		.status(200)
		.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
