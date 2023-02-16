const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("blog id is defined", async () => {
	const result = await api.get("/api/blogs");
	expect(result.body[0].id).toBeDefined();
});

test("a blog can be added", async () => {
	const newBlog = {
		title: "Why double quotes are better than single quotes",
		author: "Ender",
		url: "https://google.fi",
		likes: 999999,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	const titles = response.body.map((r) => r.title);

	expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
	expect(titles).toContain("Why double quotes are better than single quotes");
});

test("a blog has 0 likes by default", async () => {
	const newBlog = {
		title: "Why double quotes are better than single quotes",
		author: "Ender",
		url: "https://google.fi",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	const likes = response.body.map((r) => r.likes);

	expect(likes[likes.length - 1]).toBe(0);
});

test("a blog without a title can't be added", async () => {
	const newBlog = {
		author: "Ender",
		url: "https://google.fi",
		likes: 999999,
	};

	await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a blog without an url can't be added", async () => {
	const newBlog = {
		title: "Why double quotes are better than single quotes",
		author: "Ender",
		likes: 999999,
	};

	await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
	await mongoose.connection.close();
});
