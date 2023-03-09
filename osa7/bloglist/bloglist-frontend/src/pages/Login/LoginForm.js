import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/loginReducer";

const LoginForm = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		dispatch(login({ username, password }));
	};

	const inputClass =
		"py-2 px-6 rounded-md bg-neutral-700  focus:outline-none focus:shadow-lg";

	return (
		<form className="flex flex-col gap-2 py-2" onSubmit={handleSubmit}>
			<input
				className={inputClass}
				type="text"
				id="username"
				autoComplete="username"
				onChange={(evt) => setUsername(evt.target.value)}
				placeholder="Username"
				required
			/>
			<input
				className={inputClass}
				type="password"
				id="password"
				autoComplete="current-password"
				onChange={(evt) => setPassword(evt.target.value)}
				placeholder="Password"
				required
			/>
			<button
				type="submit"
				id="login"
				className="py-2 px-6 bg-purple-800 hover:bg-purple-700 transition-colors shadow-md rounded-md"
			>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
