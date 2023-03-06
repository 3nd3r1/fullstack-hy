import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		await createBlog(newBlog);
		setNewBlog({ title: "", author: "", url: "" });
	};

	return (
		<div className="d-flex flex-column align-items-center">
			<h3 className="card-title text-center mb-3">Create New</h3>
			<div className="w-75">
				<form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
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
					</div>

					<div className="form-group">
						<input
							className="form-control"
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
					</div>

					<div className="form-group">
						<input
							className="form-control"
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
					</div>
					<div className="form-group">
						<button type="submit" id="blog-create" className="form-control">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BlogForm;
