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
	query ($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

export const meQuery = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`;
