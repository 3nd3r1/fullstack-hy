import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../reducers/loginReducer";

const Logout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout());
	}, [dispatch]);

	return <Navigate to="/login" replace={true} />;
};

export default Logout;
