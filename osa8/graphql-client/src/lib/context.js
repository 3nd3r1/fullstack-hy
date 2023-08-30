import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext(null);
export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	}, [notification]);

	const notify = (message, type = "success") => {
		setNotification({ message, type });
	};

	return (
		<NotificationContext.Provider value={{ notify, notification }}>
			{children}
		</NotificationContext.Provider>
	);
};
export const useNotification = () => {
	const ctx = useContext(NotificationContext);
	return ctx;
};

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const tokenLocal = localStorage.getItem("user-token");
		if (tokenLocal) {
			setToken(tokenLocal);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (token) {
			localStorage.setItem("user-token", token);
		}
	}, [token]);

	return (
		<UserContext.Provider value={{ token, setToken, loading }}>
			{children}
		</UserContext.Provider>
	);
};
export const useUser = () => {
	const ctx = useContext(UserContext);
	return ctx;
};
