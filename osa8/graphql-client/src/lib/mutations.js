import { gql } from "@apollo/client";

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
			title
			author {
				name
				born
				bookCount
			}
			published
			genres
		}
	}
`;

export const editAuthorMutation = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			bookCount
		}
	}
`;

export const loginMutation = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
