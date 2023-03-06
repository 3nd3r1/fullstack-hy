const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");


describe("dummy", () => {
	test("dummy returns one", () => {
		expect(listHelper.dummy([])).toBe(1);
	});
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		expect(listHelper.totalLikes([])).toBe(0);
	});
	test("when list has only one blog equals the likes of that", () => {
		expect(listHelper.totalLikes(testHelper.listWithOneBlog)).toBe(5);
	});
	test("of a bigger list is calculated right", () => {
		expect(listHelper.totalLikes(testHelper.listWithMultipleBlogs)).toBe(36);
	});
});

describe("favorite blog", () => {
	test("of empty list is null", () => {
		expect(listHelper.favoriteBlog([])).toEqual(null);
	});
	test("of list with one blog equals to that", () => {
		expect(listHelper.favoriteBlog(testHelper.listWithOneBlog)).toEqual({
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			likes: 5,
		});
	});
	test("of a bigger list is right", () => {
		expect(listHelper.favoriteBlog(testHelper.listWithMultipleBlogs)).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		});
	});
});

describe("most blogs", () => {
	test("of empty list is null", () => {
		expect(listHelper.mostBlogs([])).toEqual(null);
	});
	test("of list with one blog equals to the author of that", () => {
		expect(listHelper.mostBlogs(testHelper.listWithOneBlog)).toEqual({
			author: "Edsger W. Dijkstra",
			blogs: 1,
		});
	});
	test("of a bigger list is right", () => {
		expect(listHelper.mostBlogs(testHelper.listWithMultipleBlogs)).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		});
	});
});

describe("most likes", () => {
	test("of empty list is null", () => {
		expect(listHelper.mostLikes([])).toEqual(null);
	});
	test("of list with one blog equals to the author of that", () => {
		expect(listHelper.mostLikes(testHelper.listWithOneBlog)).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 5,
		});
	});
	test("of a bigger list is right", () => {
		expect(listHelper.mostLikes(testHelper.listWithMultipleBlogs)).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17,
		});
	});
});
