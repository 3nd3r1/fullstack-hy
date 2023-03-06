const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};

	return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	let returnBlog = null;

	blogs.forEach((blog) => {
		if (!returnBlog || blog.likes > returnBlog.likes) {
			returnBlog = {
				title: blog.title,
				author: blog.author,
				likes: blog.likes,
			};
		}
	});

	return returnBlog;
};

const mostBlogs = (blogs) => {
	const authorBlogs = {};
	let returnAuthor = null;
	blogs.forEach((blog) => {
		if (!authorBlogs[blog.author]) {
			authorBlogs[blog.author] = 0;
		}
		authorBlogs[blog.author] += 1;
		if (!returnAuthor || authorBlogs[blog.author] > returnAuthor.blogs) {
			returnAuthor = {
				author: blog.author,
				blogs: authorBlogs[blog.author],
			};
		}
	});
	return returnAuthor;
};

const mostLikes = (blogs) => {
	const authorLikes = {};
	let returnAuthor = null;
	blogs.forEach((blog) => {
		if (!authorLikes[blog.author]) {
			authorLikes[blog.author] = 0;
		}
		authorLikes[blog.author] += blog.likes;
		if (!returnAuthor || authorLikes[blog.author] > returnAuthor.likes) {
			returnAuthor = {
				author: blog.author,
				likes: authorLikes[blog.author],
			};
		}
	});
	return returnAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
