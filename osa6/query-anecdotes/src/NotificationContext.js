import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW":
			return { active: true, message: action.payload.message };
		case "HIDE":
			return { active: false, message: "" };
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		{
			active: false,
			message: "",
		}
	);

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext)[0];
};

export const useNotificationDispatch = () => {
	return useContext(NotificationContext)[1];
};

export default NotificationContext;
