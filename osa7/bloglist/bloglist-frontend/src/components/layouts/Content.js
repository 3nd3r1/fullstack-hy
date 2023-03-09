import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Content = ({ children }) => {
	const user = useSelector((state) => state.user);

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	return (
		<motion.div
			className="flex flex-col max-w-4xl page-container"
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
};

export default Content;
