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
		comments: [],
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
	const blog = await Blog.findById(request.params.id);

	if (!blog) {
		throw new NotFound("Blog with that id was not found!");
	}

	/*
    Poistan tämän, jotta muiden blogeista voi tykätä.
    Paras vaihtoehto olisi varmaan, että likes on ainoa kenttä jota voi päivittää muiden blogeista.

	if (blog.user.toString() !== user._id.toString()) {
		throw new BadAuth("Updating not permitted!");
	}
    */

	blog.title = body.title;
	blog.url = body.url;
	blog.likes = body.likes ? Number(body.likes) : blog.likes;
	blog.author = body.author ? body.author : blog.author;

	const result = await blog.save();
	const updatedBlog = await Blog.findById(result._id).populate("user");

	response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
	const { body } = request;
	const blog = await Blog.findById(request.params.id);

	if (!body.comment) {
		throw new BadRequest("Comment must be specified!");
	}

	if (!blog) {
		throw new NotFound("Blog with that id was not found!");
	}

	blog.comments = blog.comments.concat(body.comment);

	const result = await blog.save();
	const updatedBlog = await Blog.findById(result._id).populate("user");

	response.json(updatedBlog);
});

module.exports = blogsRouter;
