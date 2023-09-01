import { gql } from "@apollo/client";

export const authorFragment = gql`
	fragment author on Author {
		name
		born
		bookCount
		id
	}
`;

export const bookFragment = gql`
	fragment book on Book {
		title
		author {
			...author
		}
		published
		genres
		id
	}
	${authorFragment}
`;
