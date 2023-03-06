import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LoginPage from "./components/LoginPage";
import BlogPage from "./components/Blog/BlogPage";
import Notification from "./components/Notification";

import { initializeUser } from "./reducers/userReducer";

import "./global.css";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeUser());
	}, [dispatch]);

	return (
		<div>
			<h2 className="text-center m-4">Bloglist</h2>
			<Notification />
			<LoginPage />
			<BlogPage />
		</div>
	);
};

export default App;
