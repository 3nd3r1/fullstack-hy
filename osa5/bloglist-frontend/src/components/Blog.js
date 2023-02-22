const Blog = ({ blog }) => (
	<li>
		{blog.title} - <strong>{blog.author}</strong>
	</li>
);

export default Blog;
