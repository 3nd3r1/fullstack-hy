const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const pubsub = new PubSub();

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.aggregate([
					{
						$lookup: {
							from: "books",
							localField: "author",
							foreignField: "author",
							as: "books",
						},
					},
					{
						$lookup: {
							from: "authors",
							localField: "author",
							foreignField: "_id",
							as: "author",
						},
					},

					{
						$set: {
							author: { $first: "$author" },
						},
					},
					{
						$set: {
							"author.bookCount": { $size: "$books" },
						},
					},
				]);
			}

			if (!args.author) {
				return Book.aggregate([
					{ $match: { genres: args.genre } },
					{
						$lookup: {
							from: "books",
							localField: "author",
							foreignField: "author",
							as: "books",
						},
					},
					{
						$lookup: {
							from: "authors",
							localField: "author",
							foreignField: "_id",
							as: "author",
						},
					},
					{
						$set: {
							author: { $first: "$author" },
						},
					},
					{
						$set: {
							"author.bookCount": { $size: "$books" },
						},
					},
				]);
			}

			const author = await Author.findOne({ name: args.author });

			if (!args.genre) {
				return Book.aggregate([
					{ $match: { author: author._id } },
					{
						$lookup: {
							from: "books",
							localField: "author",
							foreignField: "author",
							as: "books",
						},
					},
					{
						$lookup: {
							from: "authors",
							localField: "author",
							foreignField: "_id",
							as: "author",
						},
					},

					{
						$set: {
							author: { $first: "$author" },
						},
					},
					{
						$set: {
							"author.bookCount": { $size: "$books" },
						},
					},
				]);
			}

			return Book.aggregate([
				{
					$match: {
						$and: [{ author: author._id }, { genres: args.genre }],
					},
				},
				{
					$lookup: {
						from: "books",
						localField: "author",
						foreignField: "author",
						as: "books",
					},
				},
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},

				{
					$set: {
						author: { $first: "$author" },
					},
				},
				{
					$set: {
						"author.bookCount": { $size: "$books" },
					},
				},
			]);
		},
		allAuthors: async () =>
			Author.aggregate([
				{
					$lookup: {
						from: "books",
						localField: "_id",
						foreignField: "author",
						as: "books",
					},
				},
				{
					$addFields: {
						bookCount: { $size: "$books" },
					},
				},
			]),
		me: (root, args, context) => context.currentUser,
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("Not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
					},
				});
			}
			let author = (
				await Author.aggregate([
					{ $match: { name: args.author } },
					{
						$lookup: {
							from: "books",
							localField: "_id",
							foreignField: "author",
							as: "books",
						},
					},
					{
						$addFields: {
							bookCount: { $size: "$books" },
						},
					},
				])
			)[0];

			if (!author) {
				author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (error) {
					throw new GraphQLError("Saving author failed", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.author,
							error,
						},
					});
				}
				author.bookCount = 0;
			}

			author.bookCount += 1;
			const book = new Book({ ...args, author });

			return book
				.save()
				.catch((error) => {
					throw new GraphQLError("Saving book failed", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.title,
							error,
						},
					});
				})
				.then((book) => {
					const addedBook = {
						_id: book._id,
						title: book.title,
						published: book.published,
						genres: book.genres,
						author: {
							_id: book.author._id,
							name: author.name,
							born: author.born,
							bookCount: author.bookCount,
						},
					};
					pubsub.publish("BOOK_ADDED", { bookAdded: addedBook });
					return addedBook;
				});
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("Not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
					},
				});
			}
			const author = await Author.findOne({ name: args.name });
			if (!author) {
				return null;
			}

			author.born = args.setBornTo;
			return author
				.save()
				.catch((error) => {
					throw new GraphQLError("Saving author failed", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.setBornTo,
							error,
						},
					});
				})
				.then((author) => {
					const bookCount = Book.collection.countDocuments({
						author: author._id,
					});
					return {
						_id: author._id,
						name: author.name,
						born: author.born,
						bookCount,
					};
				});
		},
		createUser: async (root, args) => {
			const user = new User({ ...args });

			return user.save().catch((error) => {
				throw new GraphQLError("Saving user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.username,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "pupu123") {
				throw new GraphQLError("Wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
		},
	},
	Author: {
		id: (root) => root._id,
	},
	Book: {
		id: (root) => root._id,
	},
};

module.exports = resolvers;
