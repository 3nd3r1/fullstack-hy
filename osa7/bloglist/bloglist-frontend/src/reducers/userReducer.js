import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import loginService from "../services/login";

import { fetchBlogs } from "./blogReducer";
import { sendNotification } from "./notificationReducer";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const initializeUser = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem("userSession");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
			dispatch(fetchBlogs());
		}
	};
};

export const login = ({ username, password }) => {
	return async (dispatch) => {
		try {
			const data = await loginService.login({ username, password });
			dispatch(setUser(data));
			blogService.setToken(data.token);
			window.localStorage.setItem("userSession", JSON.stringify(data));
			dispatch(fetchBlogs());
		} catch (error) {
			dispatch(
				sendNotification({
					text: error.response.data.error,
					type: "danger",
				})
			);
		}
	};
};
export const logout = () => {
	return async (dispatch) => {
		dispatch(setUser(null));
		window.localStorage.removeItem("userSession");
	};
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
