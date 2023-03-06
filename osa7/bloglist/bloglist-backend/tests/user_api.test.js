const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		const usernames = usersAtEnd.map((u) => u.username);

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
		expect(usernames).toContain(newUser.username);
	});

	test("creation doesn't succeed with under 3 character password", async () => {
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "sa",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);
		expect(result.body.error).toMatch("must be atleast 3 characters");
	});

	test("creation doesn't succeed with under 3 character username", async () => {
		const newUser = {
			username: "ml",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);
		expect(result.body.error).toMatch("must be atleast 3 characters");
	});

	test("creation doesn't succeed with missing password", async () => {
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);
		expect(result.body.error).toMatch("must be specified");
	});

	test("creation doesn't succeed with missing username", async () => {
		const newUser = {
			name: "Matti Luukkainen",
			password: "salainen",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);
		expect(result.body.error).toMatch("must be specified");
	});

	test("creation doesn't succeed with non-unique username", async () => {
		const newUser = {
			username: "root",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);
		expect(result.body.error).toMatch("must be unique");
	});
});
afterAll(async () => {
	await mongoose.connection.close();
});
