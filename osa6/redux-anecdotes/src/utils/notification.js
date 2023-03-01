import {
	hideNotification,
	showNotification,
} from "../reducers/notificationReducer";

let currentAlert = null;

export const sendNotificaion = (dispatch, message) => {
	dispatch(showNotification(message));
	if (currentAlert) {
		clearTimeout(currentAlert);
	}
	currentAlert = setTimeout(() => dispatch(hideNotification()), 5000);
};
