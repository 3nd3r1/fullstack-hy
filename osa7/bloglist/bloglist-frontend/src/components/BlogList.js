import Blog from "./BlogLink";

const BlogList = ({ blogs }) => {
	return (
		<div className="flex flex-col gap-2">
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default BlogList;
