const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
	await User.deleteMany({});
	const passwordHash = await bcrypt.hash("sekret", 10);
	const user = new User({ username: "root", passwordHash });
	await user.save();
});

beforeEach(async () => {
	const user = await User.findOne({});
	const initialBlogs = helper.initialBlogs.map((blog) => ({
		...blog,
		author: user._id,
	}));

	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});

describe("fetching of blogs", () => {
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
});

describe("addition of a new blog", () => {
	test("a blog can be added", async () => {
		const token = await helper.getToken();
		const newBlog = {
			title: "Why double quotes are better than single quotes",
			url: "https://google.fi",
			likes: 999999,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: token })
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		const titles = response.body.map((r) => r.title);

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
		expect(titles).toContain(
			"Why double quotes are better than single quotes"
		);
	});

	test("a blog has 0 likes by default", async () => {
		const token = await helper.getToken();
		const newBlog = {
			title: "Why double quotes are better than single quotes",
			author: "Ender",
			url: "https://google.fi",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: token })
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		const likes = response.body.map((r) => r.likes);

		expect(likes[likes.length - 1]).toBe(0);
	});

	test("a blog without a title can't be added", async () => {
		const token = await helper.getToken();
		const newBlog = {
			url: "https://google.fi",
			likes: 999999,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: token })
			.expect(400);
	});

	test("a blog without an url can't be added", async () => {
		const token = await helper.getToken();
		const newBlog = {
			title: "Why double quotes are better than single quotes",
			likes: 999999,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: token })
			.expect(400);
	});

	test("a blog can't be added without a token", async () => {
		const newBlog = {
			title: "Why double quotes are better than single quotes",
			url: "https://google.fi",
			likes: 999999,
		};

		await api.post("/api/blogs").send(newBlog).expect(401);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const token = await helper.getToken();
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: token })
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		const titles = blogsAtEnd.map((r) => r.title);

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("updating of a blog", () => {
	test("succeeds with status code 200 if blog and id is valid", async () => {
		const token = await helper.getToken();
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];

		const updatedBlog = {
			title: blogToUpdate.title,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 10,
		};

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.set({ Authorization: token })
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd[0].id).toBe(blogToUpdate.id);
		expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
