import React from "react";

const BlogLoginInfo = ({ user, logout }) => {
	return (
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
	);
};

export default BlogLoginInfo;
