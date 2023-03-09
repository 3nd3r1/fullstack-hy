import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { sendNotification } from "./notificationReducer";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		addBlog(state, action) {
			state.push(action.payload);
		},
		updateBlog(state, action) {
			return state
				.filter((blog) => blog.id !== action.payload.id)
				.concat(action.payload)
				.sort((b1, b2) => b2.likes - b1.likes);
		},
		deleteBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload);
		},
		setBlogs(state, action) {
			return action.payload.sort((b1, b2) => b2.likes - b1.likes);
		},
	},
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = ({ title, author, url }) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create({ title, author, url });
			dispatch(addBlog(newBlog));
			dispatch(
				sendNotification({
					text: `a new blog ${newBlog.title} by ${newBlog.author} added!`,
					type: "success",
				})
			);
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

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(
			{ ...blog, likes: blog.likes + 1 },
			blog.id
		);
		dispatch(updateBlog(updatedBlog));
	};
};

export const commentBlog = ({ id, comment }) => {
	return async (dispatch) => {
		try {
			const updatedBlog = await blogService.comment(id, comment);
			dispatch(updateBlog(updatedBlog));
			dispatch(
				sendNotification({ text: "Added comment!", type: "success" })
			);
		} catch (error) {
			dispatch(
				sendNotification({
					text: error.response
						? error.response.data.error
						: error.message,
					type: "danger",
				})
			);
		}
	};
};

export const removeBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.remove(blog.id);
			dispatch(deleteBlog(blog.id));
			dispatch(
				sendNotification({
					text: `Removed blog ${blog.title} by ${blog.author}!`,
					type: "success",
				})
			);
		} catch (error) {
			dispatch(
				sendNotification({
					text: error.response
						? error.response.data.error
						: error.message,
					type: "danger",
				})
			);
		}
	};
};

export const { addBlog, updateBlog, setBlogs, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
