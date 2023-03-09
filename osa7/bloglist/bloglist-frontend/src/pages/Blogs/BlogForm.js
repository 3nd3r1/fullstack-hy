import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogReducer";

const BlogForm = ({ hide }) => {
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
	const dispatch = useDispatch();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		dispatch(createBlog(newBlog));
		setNewBlog({ title: "", author: "", url: "" });
		hide();
	};

	const inputStyle =
		"p-1 rounded-md bg-neutral-700 shadow-md shadow-md focus:outline-0";

	return (
		<div className="flex flex-col items-center ">
			<h3 className="text-center mb-3 text-2xl font-bold">Create New</h3>
			<form
				className="w-full flex flex-col gap-3"
				onSubmit={handleSubmit}
			>
				<input
					className={inputStyle}
					type="text"
					id="blog-title"
					placeholder="Title"
					onChange={(evt) =>
						setNewBlog({
							...newBlog,
							title: evt.target.value,
						})
					}
					value={newBlog.title}
				/>

				<input
					className={inputStyle}
					type="text"
					id="blog-author"
					placeholder="Author"
					onChange={(evt) =>
						setNewBlog({
							...newBlog,
							author: evt.target.value,
						})
					}
					value={newBlog.author}
				/>

				<input
					className={inputStyle}
					type="text"
					id="blog-url"
					placeholder="Url"
					onChange={(evt) =>
						setNewBlog({
							...newBlog,
							url: evt.target.value,
						})
					}
					value={newBlog.url}
				/>
				<button
					type="submit"
					id="blog-create"
					className="bg-green-800 hover:bg-green-700 p-1 rounded-md shadow-md font-bold"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
