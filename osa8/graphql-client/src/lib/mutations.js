import { gql } from "@apollo/client";
import { authorFragment, bookFragment } from "./fragments";

export const createBookMutation = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...book
		}
	}
	${bookFragment}
`;

export const editAuthorMutation = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			...author
		}
	}
	${authorFragment}
`;

export const loginMutation = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
