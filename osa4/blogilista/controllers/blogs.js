const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { BadRequest, BadAuth, NotFound } = require("../utils/errors");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const { body } = request;
	const user = await User.findById(request.user.id);

	if (!body.title || !body.url) {
		throw new BadRequest("Title and url must be specified!");
	}

	const blog = new Blog({
		title: body.title,
		author: body.author ? body.author : "Anonymous",
		url: body.url,
		user: user._id,
		likes: body.likes ? Number(body.likes) : 0,
	});

	const result = await blog.save();
	user.blogs = user.blogs.concat(result._id);
	await user.save();

	const newBlog = await Blog.findById(result._id).populate("user", {
		username: 1,
		name: 1,
	});

	response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	const user = await User.findById(request.user.id);
	const blog = await Blog.findById(request.params.id);

	if (!blog) {
		throw new NotFound("Blog with that id was not found!");
	}

	if (blog.user.toString() !== user._id.toString()) {
		throw new BadAuth("Deletion not permitted!");
	}

	await blog.delete();
	user.blogs = user.blogs.filter(
		(blogid) => blogid.toString() !== blog._id.toString()
	);
	await user.save();
	response.status(204).end();
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
	const { body } = request;
	const user = await User.findById(request.user.id);
	const blog = await Blog.findById(request.params.id);

	if (!blog) {
		throw new NotFound("Blog with that id was not found!");
	}

	if (blog.user.toString() !== user._id.toString()) {
		throw new BadAuth("Updating not permitted!");
	}

	blog.title = body.title;
	blog.url = body.url;
	blog.likes = body.likes ? Number(body.likes) : blog.likes;
	blog.author = body.author ? body.author : blog.author;

	const result = await blog.save();

	response.json(result);
});

module.exports = blogsRouter;
