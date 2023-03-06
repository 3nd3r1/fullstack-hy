import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../reducers/userReducer";

const LoginPage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		dispatch(login({ username, password }));
	};

	if (user) {
		return;
	}

	return (
		<div className="card margin-auto bg-secondary m-auto w-25 p-2 shadow">
			<div className="card-body d-flex flex-column align-items-center gap-2">
				<h4 className="card-title ">Log in to application</h4>
				<form className="w-75" onSubmit={handleSubmit}>
					<div className="form-group mb-2">
						<input
							className="form-control"
							type="text"
							id="username"
							autoComplete="username"
							onChange={(evt) => setUsername(evt.target.value)}
							placeholder="Username"
						/>
					</div>
					<div className="form-group mb-2">
						<input
							className="form-control"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(evt) => setPassword(evt.target.value)}
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<button
							type="submit"
							id="login"
							className="form-control"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
