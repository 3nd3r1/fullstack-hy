import { Notification } from "../lib/types";
const NotificationDisplay = ({
	notification,
}: {
	notification: Notification;
}) => {
	const notificationStyle = {
		color: notification.type === "error" ? "red" : "green",
	};

	return <div style={notificationStyle}>{notification.message}</div>;
};

export default NotificationDisplay;
