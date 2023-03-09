import { useRef } from "react";
import { useSelector } from "react-redux";

import BlogForm from "./BlogForm";

import Togglable from "../../components/Togglable";
import Layout from "../../components/layouts/Content";
import BlogList from "../../components/BlogList";

const BlogsPage = () => {
	const blogFormRef = useRef();
	const blogs = useSelector((state) => state.blogs);

	return (
		<Layout>
			<h3 className="text-center text-2xl font-bold mb-4">Blogs</h3>
			<Togglable buttonLabel="New Blog" ref={blogFormRef}>
				<BlogForm hide={() => blogFormRef.current.toggleVisibility()} />
			</Togglable>

			<BlogList id="blog-list" blogs={blogs} />
		</Layout>
	);
};

export default BlogsPage;
