import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

export const getBooksQuery = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`;
