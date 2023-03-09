import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { likeBlog } from "../../reducers/blogReducer";
import CommentForm from "./CommentForm";

const BlogProfile = () => {
	const id = useParams().id;
	const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
	const dispatch = useDispatch();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4 text-center">
				{blog.title} by {blog.author}
			</h2>
			<div className="text-center">
				<a
					className="text-purple-400 hover:text-purple-300 text-lg"
					href={blog.url}
					target="_blank"
					rel="noreferrer"
				>
					{blog.url}
				</a>
				<div className="text-lg">
					{blog.likes} likes{" "}
					<button
						className="bg-neutral-700 hover:bg-neutral-600 p-1 px-2 rounded-md shadow-md"
						onClick={() => dispatch(likeBlog(blog))}
					>
						like
					</button>
				</div>
				<p className="text-lg">
					added by{" "}
					<Link
						className="text-purple-400 hover:text-purple-300"
						to={`/users/${blog.user.id}`}
					>
						{blog.user.name}
					</Link>
				</p>
			</div>
			<div>
				<h3 className="text-xl font-bold mt-5 mb-4 text-center">
					Comments:
				</h3>
				<CommentForm />
				<div className="text-center">
					<ul className="list-disc list-inside mt-5 text-lg inline-block text-left">
						{blog.comments.map((comment) => (
							<li key={comment}>{comment}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BlogProfile;
