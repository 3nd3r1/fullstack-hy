import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	active: false,
	message: "",
};

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

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
