import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";

const dummyBlog = {
	title: "Double quotes are better than single quotes",
	author: "Ender",
	user: {
		id: "1",
		username: "Pete",
		name: "Pete Parkkonen",
	},
	url: "https://google.fi",
	likes: 2,
};
const dummyUser = {
	token: "ey989384928340293",
	username: "Pete",
	name: "Pete Parkkonen",
};

test("renders content", () => {
	render(<Blog blog={dummyBlog} />);

	expect(
		screen.getByText("Double quotes are better than single quotes")
	).toBeDefined();
	expect(screen.getByText("Ender")).toBeDefined();

	expect(screen.queryByText("https://google.fi")).toBeNull();
	expect(screen.queryByText(2)).toBeNull();
});

test("clicking show reveals all information", async () => {
	render(<Blog blog={dummyBlog} user={dummyUser} />);

	const user = userEvent.setup();
	const buttonView = screen.getByText("view");

	await user.click(buttonView);

	expect(
		screen.getByText("Double quotes are better than single quotes")
	).toBeDefined();
	expect(screen.getByText("Ender")).toBeDefined();

	expect(screen.getByText("https://google.fi")).toBeDefined();
	expect(screen.getByText(2)).toBeDefined();
	expect(screen.getByText("Pete Parkkonen")).toBeDefined();
});

test("clicking like 2 times calls handler 2 times", async () => {
	const mockHandler = jest.fn();

	render(<Blog blog={dummyBlog} user={dummyUser} likeBlog={mockHandler} />);

	const user = userEvent.setup();

	const buttonView = screen.getByText("view");
	await user.click(buttonView);

	const buttonLike = screen.getByText("Like");
	await user.click(buttonLike);
	await user.click(buttonLike);

	expect(mockHandler.mock.calls).toHaveLength(2);
});
