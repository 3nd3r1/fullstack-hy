import Authors from "./components/pages/Authors";
import Books from "./components/pages/Books";
import Login from "./components/pages/Login";
import NewBook from "./components/pages/NewBook";
import Recommended from "./components/pages/Recommended";
import Logout from "./components/pages/Logout";

import Nav from "./components/Nav";
import Notification from "./components/Notification";

import { NotificationProvider, UserProvider } from "./lib/context";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<Router>
			<UserProvider>
				<NotificationProvider>
					<Nav />
					<Notification />
					<Routes>
						<Route path="/" element={<Navigate to="/authors" />} />
						<Route path="/login" element={<Login />} />
						<Route path="/authors" element={<Authors />} />
						<Route path="/books" element={<Books />} />
						<Route element={<PrivateRoute />}>
							<Route path="/logout" element={<Logout />} />
							<Route
								path="/recommend"
								element={<Recommended />}
							/>
							<Route path="/add" element={<NewBook />} />
						</Route>
					</Routes>
				</NotificationProvider>
			</UserProvider>
		</Router>
	);
};

export default App;
