import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	if (!notification.active) {
		return;
	}

	return (
		<div
			className={`alert alert-${notification.type} fade show w-25 m-auto mb-4`}
			role="alert"
		>
			<strong>{notification.text}</strong>
		</div>
	);
};

export default Notification;
