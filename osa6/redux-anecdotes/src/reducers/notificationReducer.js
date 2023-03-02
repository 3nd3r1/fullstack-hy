import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	active: false,
	message: "",
};

let activeNotification = null;

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification(state, action) {
			state.active = true;
			state.message = action.payload;
		},
		hideNotification(state, action) {
			state.active = false;
			state.message = "";
		},
	},
});

export const sendNotification = (message, duration = 5000) => {
	return async (dispatch) => {
		dispatch(showNotification(message));

		if (activeNotification) {
			clearTimeout(activeNotification);
		}

		activeNotification = setTimeout(
			() => dispatch(hideNotification()),
			duration
		);
	};
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
