import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { commentBlog } from "../../reducers/blogReducer";

const CommentForm = () => {
	const id = useParams().id;
	const dispatch = useDispatch();

	const [comment, setComment] = useState("");

	return (
		<form
			className="max-w-xl mx-auto"
			onSubmit={(e) => {
				e.preventDefault();
				dispatch(commentBlog({ id, comment }));
				setComment("");
			}}
		>
			<div className="flex flex-row gap-3">
				<input
					type="text"
					className="bg-neutral-700 rounded p-1 px-2 grow shadow-md focus:outline-0 focus:shadow-lg"
					onChange={(e) => setComment(e.target.value)}
					value={comment}
					placeholder="Comment..."
					required
				/>
				<button
					type="submit"
					className="p-1 bg-purple-600 hover:bg-purple-500 rounded shadow-md font-bold"
				>
					Comment
				</button>
			</div>
		</form>
	);
};

export default CommentForm;
