const Blog = ({ blog }) => (
	<li>
		{blog.title} - <strong>{blog.author.name}</strong>
	</li>
);

export default Blog;
