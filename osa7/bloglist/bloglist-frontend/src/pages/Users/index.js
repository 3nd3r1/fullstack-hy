import React from "react";
import Layout from "../../components/layouts/Content";
import UserList from "./UserList";

const UsersPage = () => {
	return (
		<Layout>
			<h2 className="text-2xl font-bold text-center mb-6">Users</h2>
			<UserList />
		</Layout>
	);
};

export default UsersPage;
