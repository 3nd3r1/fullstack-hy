import { useRef } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import BlogLoginInfo from "./BlogLoginInfo";

import Togglable from "./Togglable";

import PropTypes from "prop-types";

const BlogPage = ({
	blogs,
	user,
	logout,
	createBlog,
	removeBlog,
	likeBlog,
}) => {
	const blogFormRef = useRef();

	const createBlogAndHide = (newBlog) => {
		createBlog(newBlog);
		blogFormRef.current.toggleVisibility();
	};

	const confirmAndDelete = (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			removeBlog(blog);
		}
	};

	return (
		<div className="card bg-secondary m-auto w-50 p-2 shadow">
			<div className="card-body d-flex flex-column align-items-stretch gap-2 w-100">
				<BlogLoginInfo user={user} logout={logout} />
				<Togglable buttonLabel="New Blog" ref={blogFormRef}>
					<BlogForm createBlog={createBlogAndHide} />
				</Togglable>
				<BlogList
					blogs={blogs}
					removeBlog={confirmAndDelete}
					likeBlog={likeBlog}
					user={user}
				/>
			</div>
		</div>
	);
};

BlogPage.propTypes = {
	blogs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			likes: PropTypes.number.isRequired,
		})
	),
	user: PropTypes.shape({
		token: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	logout: PropTypes.func.isRequired,
	createBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	likeBlog: PropTypes.func.isRequired,
};

export default BlogPage;
