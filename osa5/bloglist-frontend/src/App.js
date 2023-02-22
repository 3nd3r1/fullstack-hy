import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import "./global.css";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	const fetchBlogs = async () => {
		const data = await blogService.getAll();
		setBlogs(data);
	};

	const createBlog = async (newBlog) => {
		try {
			const result = await blogService.create(newBlog);
			setBlogs(blogs.concat(result));
			setNotification({
				type: "success",
				text: `a new blog ${result.title} by ${result.author} added!`,
			});
		} catch (error) {
			setNotification({
				type: "danger",
				text: error.response.data.error,
			});
		}
	};

	const logout = () => {
		window.localStorage.removeItem("userSession");
		setUser(null);
	};

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("userSession");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	useEffect(() => {
		if (user !== null) {
			blogService.setToken(user.token);
			window.localStorage.setItem("userSession", JSON.stringify(user));
			fetchBlogs();
		}
	}, [user]);

	useEffect(() => {
		if (notification !== null) {
			setTimeout(() => setNotification(null), 5000);
		}
	}, [notification]);

	return (
		<div>
			<h2 className="text-center m-4">Bloglist</h2>
			<Notification notification={notification} />
			{user === null && (
				<LoginForm
					setUser={setUser}
					setNotification={setNotification}
				/>
			)}
			{user !== null && (
				<BlogList
					blogs={blogs}
					user={user}
					logout={logout}
					createBlog={createBlog}
				/>
			)}
		</div>
	);
};

export default App;
