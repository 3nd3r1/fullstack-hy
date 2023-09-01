import { gql } from "@apollo/client";
import { bookFragment } from "./fragments";

export const bookAddedSubscription = gql`
	subscription {
		bookAdded {
			...book
		}
	}
	${bookFragment}
`;
