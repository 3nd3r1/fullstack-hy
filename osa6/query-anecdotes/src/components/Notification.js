import { useContext, useEffect, useRef } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
	const [notification, notificationDispatch] =
		useContext(NotificationContext);
	const notificationTimeout = useRef(null);

	useEffect(() => {
		if (notification.active) {
			if (notificationTimeout.current) {
				clearTimeout(notificationTimeout.current);
			}
			notificationTimeout.current = setTimeout(
				() => notificationDispatch({ type: "HIDE" }),
				5000
			);
		}
	}, [notification, notificationDispatch]);

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	if (!notification.active) return;

	return <div style={style}>{notification.message}</div>;
};

export default Notification;
