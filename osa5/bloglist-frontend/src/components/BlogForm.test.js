import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm/> calls handler with correct data on submit", async () => {
	const user = userEvent.setup();
	const createBlog = jest.fn();

	render(<BlogForm createBlog={createBlog} />);

	const titleInput = screen.getByPlaceholderText("Title");
	const authorInput = screen.getByPlaceholderText("Author");
	const urlInput = screen.getByPlaceholderText("Url");
	const sendButton = screen.getByText("Create");

	await user.type(titleInput, "Testing a form");
	await user.type(authorInput, "Ender");
	await user.type(urlInput, "https://google.fi");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe("Testing a form");
	expect(createBlog.mock.calls[0][0].author).toBe("Ender");
	expect(createBlog.mock.calls[0][0].url).toBe("https://google.fi");
});
