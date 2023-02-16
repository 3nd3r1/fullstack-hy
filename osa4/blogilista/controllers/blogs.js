const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	const { body } = request;

	if (!body.title || !body.url) {
		return response
			.status(400)
			.json({ error: "Title and url must be specified!" });
	}

	const blog = new Blog({
		title: body.title,
		author: body.author ? body.author : "Anonymous",
		url: body.url,
		likes: body.likes ? Number(body.likes) : 0,
	});

	const result = await blog.save();
	response.status(201).json(result);
});

module.exports = blogsRouter;
