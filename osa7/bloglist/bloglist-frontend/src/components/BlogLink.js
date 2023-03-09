import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Blog = ({ blog }) => {
	return (
		<Link to={`/blogs/${blog.id}`}>
			<motion.div
				className="bg-neutral-700 rounded-md shadow-sm hover:shadow-lg"
				whileHover={{ x: 30 }}
				transition={{ ease: "easeInOut" }}
			>
				<div className="">
					<div className="px-4 py-2">
						<span>{blog.title}</span>
						<span> - </span>
						<strong>{blog.author}</strong>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default Blog;
