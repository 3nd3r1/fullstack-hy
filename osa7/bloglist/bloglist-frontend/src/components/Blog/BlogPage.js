import { useRef } from "react";

import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import BlogLoginInfo from "./BlogLoginInfo";
import Togglable from "../Togglable";
import { useSelector } from "react-redux";

const BlogPage = () => {
	const user = useSelector((state) => state.user);
	const blogFormRef = useRef();

	const hideBlogForm = () => {
		blogFormRef.current.toggleVisibility();
	};

	if (!user) {
		return;
	}

	return (
		<div className="card bg-secondary m-auto w-50 p-2 shadow">
			<div className="card-body d-flex flex-column align-items-stretch gap-2 w-100">
				<BlogLoginInfo />
				<Togglable buttonLabel="New Blog" ref={blogFormRef}>
					<BlogForm hide={hideBlogForm} />
				</Togglable>
				<BlogList />
			</div>
		</div>
	);
};

export default BlogPage;
