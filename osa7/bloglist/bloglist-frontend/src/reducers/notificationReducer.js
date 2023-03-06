import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	active: false,
	type: "primary",
	text: "",
};

let activeNotification = null;

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification(state, action) {
			state.active = true;
			state.text = action.payload.text;
			state.type = action.payload.type;
		},
		hideNotification(state, action) {
			state.active = false;
			state.type = "primary";
			state.text = "";
		},
	},
});

export const sendNotification = ({
	text,
	type = "primary",
	duration = 5000,
}) => {
	return async (dispatch) => {
		dispatch(showNotification({ text, type }));

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
