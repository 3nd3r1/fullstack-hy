import { useApolloClient } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { useUser } from "../../lib/context";

const Logout = () => {
	const client = useApolloClient();
	const { token, setToken } = useUser();

	if (token) {
		setToken(null);
		localStorage.clear();
		client.clearStore(); // Clear the cache but don't refetch
	}

	return <Navigate to="/" />;
};

export default Logout;
