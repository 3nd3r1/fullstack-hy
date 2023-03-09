import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import LoginForm from "./LoginForm";

const LoginPage = () => {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	if (user & (navigate.state === "idle")) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<motion.div
			className="page-container flex flex-col max-w-xl"
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<h4 className="text-2xl font-bold mb-4 text-center">
				Log in to application
			</h4>
			<LoginForm />
		</motion.div>
	);
};

export default LoginPage;
