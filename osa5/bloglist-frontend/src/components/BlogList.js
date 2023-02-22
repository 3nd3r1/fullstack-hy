import React, { useState } from "react";
import Blog from "./Blog.js";

const BlogList = ({ blogs, user, logout, createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
	const handleSubmit = (evt) => {
		evt.preventDefault();
		createBlog(newBlog);
	};

	return (
		<div className="card margin-auto bg-secondary m-auto w-50 p-2 shadow">
			<div className="card-body d-flex flex-column align-items-stretch gap-2 w-100 text-center">
				<div className="d-flex flex-row gap-2 border-bottom pb-3 align-items-center justify-content-center">
					<h4 className="mb-1">
						Logged in as <strong>{user.username}</strong>
					</h4>
					<button
						className="btn btn-secondary btn-sm "
						onClick={() => logout()}
					>
						Log Out
					</button>
				</div>
				<div className="pb-3 border-bottom">
					<h3 className="card-title text-center">Blogs</h3>
					<div>
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				</div>
				<div className="d-flex flex-column align-items-center">
					<h3 className="card-title text-center mb-3">Create New</h3>
					<div className="w-75">
						<form
							className="d-flex flex-column gap-2"
							onSubmit={handleSubmit}
						>
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
							{/* 
                            Ymmärsin, että luodessa uutta blogia author on blogin lisääjä?

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
                            */}
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
			</div>
		</div>
	);
};

export default BlogList;
