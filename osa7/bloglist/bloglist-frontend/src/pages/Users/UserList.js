import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector((state) => state.users);
	return (
		<table className="w-full max-w-2xl mx-auto">
			<tbody>
				<tr className="">
					<th>Name</th>
					<th>Blogs Created</th>
				</tr>
				{users.map((user) => (
					<tr key={user.id}>
						<td className="text-center">
							<Link
								to={`/users/${user.id}`}
								className="text-purple-400 hover:text-purple-300 transition-colors"
							>
								{user.name}
							</Link>
						</td>
						<td className="text-center">{user.blogs.length}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserList;
