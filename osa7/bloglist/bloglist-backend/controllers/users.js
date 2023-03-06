const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const { BadRequest } = require("../utils/errors");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		url: 1,
		likes: 1,
	});
	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	const { body } = request;
	if (!body.username || !body.password) {
		throw new BadRequest("Username and password must be specified!");
	}

	if (body.username.length < 3 || body.password.length < 3) {
		throw new BadRequest(
			"Username and password must be atleast 3 characters!"
		);
	}

	const passwordHash = await bcrypt.hash(body.password, 10);

	const user = new User({
		username: body.username,
		name: body.name ? body.name : "",
		passwordHash: passwordHash,
	});

	const result = await user.save();
	response.status(201).json(result);
});

module.exports = usersRouter;
