import { useNotification } from "../lib/context";

const Notification = () => {
	const { notification } = useNotification();
	if (!notification) return null;

	let color;

	switch (notification.type) {
		case "success":
			color = "green";
			break;
		case "error":
			color = "red";
			break;
		default:
			color = "black";
			break;
	}

	const notificationStyle = {
		color,
		display: "inline-block",
		background: "lightgrey",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
