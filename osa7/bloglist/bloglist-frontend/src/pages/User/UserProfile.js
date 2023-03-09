import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogList from "../../components/BlogList";

const UserProfile = () => {
	const id = useParams().id;
	const user = useSelector((state) => state.users.find((u) => u.id === id));

	if (!user) {
		return;
	}

	return (
		<div>
			<h2 className="font-bold text-2xl text-center mb-4">{user.name}</h2>
			<h3 className="text-xl text-center mb-4">Added blogs:</h3>
			<BlogList blogs={user.blogs} />
		</div>
	);
};

export default UserProfile;
