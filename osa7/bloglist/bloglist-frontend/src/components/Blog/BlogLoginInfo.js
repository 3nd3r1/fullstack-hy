import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const BlogLoginInfo = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	return (
		<div className="d-flex flex-row gap-2 border-bottom pb-3 align-items-center justify-content-center">
			<h4 className="mb-1">
				Logged in as <strong>{user.username}</strong>
			</h4>
			<button
				className="btn btn-secondary btn-sm "
				onClick={() => dispatch(logout())}
			>
				Log Out
			</button>
		</div>
	);
};

export default BlogLoginInfo;
