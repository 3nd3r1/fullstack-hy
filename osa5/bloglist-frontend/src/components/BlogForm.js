import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

	const handleSubmit = (evt) => {
		evt.preventDefault();
		createBlog(newBlog);
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
							placeholder="Title"
							onChange={(evt) =>
								setNewBlog({
									...newBlog,
									title: evt.target.value,
								})
							}
						/>
					</div>

					<div className="form-group">
						<input
							className="form-control"
							type="text"
							placeholder="Author"
							onChange={(evt) =>
								setNewBlog({
									...newBlog,
									author: evt.target.value,
								})
							}
						/>
					</div>

					<div className="form-group">
						<input
							className="form-control"
							type="text"
							placeholder="Url"
							onChange={(evt) =>
								setNewBlog({
									...newBlog,
									url: evt.target.value,
								})
							}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="form-control">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BlogForm;
