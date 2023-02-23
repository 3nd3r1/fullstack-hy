import Blog from "./Blog";

const BlogList = ({ blogs, removeBlog, likeBlog, user }) => {
	return (
		<div className="pb-3">
			<h3 className="card-title text-center">Blogs</h3>
			<div className="d-flex flex-column gap-2">
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						likeBlog={likeBlog}
						removeBlog={removeBlog}
						owned={blog.user.username === user.username}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogList;
