import { gql } from "@apollo/client";
import { authorFragment, bookFragment } from "./fragments";

export const getAuthorsQuery = gql`
	query {
		allAuthors {
			...author
		}
	}
	${authorFragment}
`;

export const getBooksQuery = gql`
	query ($genre: String) {
		allBooks(genre: $genre) {
			...book
		}
	}
	${bookFragment}
`;

export const meQuery = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`;
