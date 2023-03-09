import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	const typeClass = (() => {
		switch (notification.type) {
			case "danger":
				return "bg-red-800";
			case "success":
				return "bg-green-800";
			default:
				return "bg-purple-800";
		}
	})();

	return (
		<AnimatePresence mode="wait" initial={true}>
			{notification.active && (
				<motion.div
					className={`max-w-2xl text-center text-xl font-bold ${typeClass} mx-auto my-4 py-2 rounded-md shadow-md`}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 100 }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
				>
					{notification.text}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Notification;
