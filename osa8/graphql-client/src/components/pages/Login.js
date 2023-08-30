import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { loginMutation } from "../../lib/mutations";
import { useNotification, useUser } from "../../lib/context";
import { Navigate } from "react-router-dom";

const Login = () => {
	const { setToken, token } = useUser();
	const { notify } = useNotification();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, result] = useMutation(loginMutation, {
		onError: (error) => {
			notify(error.message, "error");
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
		}
	}, [result.data]); //eslint-disable-line

	const handleSubmit = async (e) => {
		e.preventDefault();
		login({ variables: { username, password } });
	};

	if (token) return <Navigate to="/" />;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<input type="submit" value="Login" />
		</form>
	);
};

export default Login;
