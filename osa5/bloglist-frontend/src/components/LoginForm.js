import React, { useState } from "react";

import loginService from "../services/login";

const LoginForm = ({ setUser, setNotification }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const data = await loginService.login({ username, password });
			setUser(data);
		} catch (error) {
			setNotification({
				type: "danger",
				text: error.response.data.error,
			});
		}
	};
	return (
		<div className="card margin-auto bg-secondary m-auto w-25 p-2 shadow">
			<div className="card-body d-flex flex-column align-items-center gap-2">
				<h4 className="card-title ">Log in to application</h4>
				<form className="w-75" onSubmit={handleSubmit}>
					<div className="form-group mb-2">
						<input
							className="form-control"
							type="text"
							autoComplete="username"
							onChange={(evt) => setUsername(evt.target.value)}
							placeholder="Username"
						/>
					</div>
					<div className="form-group mb-2">
						<input
							className="form-control"
							type="password"
							autoComplete="current-password"
							onChange={(evt) => setPassword(evt.target.value)}
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="form-control">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
