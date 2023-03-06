import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../../reducers/blogReducer";

const Blog = ({ blog, owned }) => {
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(false);

	const confirmAndDelete = (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(removeBlog(blog));
		}
	};

	return (
		<div className="border rounded d-flex flex-column">
			<div className="d-flex flex-row justify-content-between align-items-center py-2">
				<div className="px-4 d-flex flex-row gap-1">
					<span>{blog.title}</span>
					<span> - </span>
					<strong>{blog.author}</strong>
				</div>
				<div className="px-4">
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? "hide" : "view"}
					</button>
				</div>
			</div>
			{expanded && (
				<div>
					<div className="text-left w-100 px-4 d-flex flex-row gap-1">
						<strong>Url:</strong>{" "}
						<a href={blog.url} target="_blank" rel="noreferrer">
							{blog.url}
						</a>
					</div>
					<div className="text-left w-100 px-4 d-flex flex-row gap-1 align-items-center">
						<strong>Likes:</strong>
						<span>{blog.likes}</span>
						<button
							className="btn btn-secondary btn-sm "
							onClick={() => dispatch(likeBlog(blog))}
						>
							Like
						</button>
					</div>
					<div className="text-left w-100 px-4 mb-2 d-flex flex-row gap-1">
						<strong>Added By:</strong>
						<span>{blog.user.name}</span>
					</div>
					{owned && (
						<div className="px-4 mb-3">
							<button
								className="btn btn-danger btn-sm"
								onClick={() => confirmAndDelete(blog)}
							>
								Remove
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
