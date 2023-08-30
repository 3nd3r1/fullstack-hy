import React from "react";
import { useUser } from "../lib/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const { token, loading } = useUser();

	if (loading) return <div>loading...</div>;

	if (!token) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default PrivateRoute;
