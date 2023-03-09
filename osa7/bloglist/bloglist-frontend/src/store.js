import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		user: loginReducer,
		users: userReducer,
		blogs: blogReducer,
	},
});

export default store;
