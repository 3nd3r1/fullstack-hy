import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);

	return (
		<div className="pb-3">
			<h3 className="card-title text-center">Blogs</h3>
			<div id="blog-list" className="d-flex flex-column gap-2">
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						owned={blog.user.username === user.username}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogList;
