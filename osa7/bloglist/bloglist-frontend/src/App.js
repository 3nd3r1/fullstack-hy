import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import BlogsPage from "./pages/Blogs";
import BlogPage from "./pages/Blog";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";

import Notification from "./components/Notification";
import Navbar from "./components/Navbar";

import { initializeUser } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";

import "./globals.scss";

const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(initializeUser());
			await dispatch(initializeBlogs());
			await dispatch(initializeUsers());
			setInitialized(true);
		})();
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<Notification />
			{initialized && (
				<AnimatePresence mode="wait" initial={true}>
					<Routes key={location.pathname} location={location}>
						<Route
							path="/"
							element={<Navigate to="/blogs" replace />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
						<Route path="/blogs" element={<BlogsPage />} />
						<Route path="/blogs/:id" element={<BlogPage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:id" element={<UserPage />} />
					</Routes>
				</AnimatePresence>
			)}
		</>
	);
};

export default App;
