import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	redirect,
	Navigate,
} from "react-router-dom";

const Nav = () => {
	const linkStyle = {
		padding: "12px",
	};

	return (
		<nav>
			<Link to="/" style={linkStyle}>
				authors
			</Link>
			<Link to="/books" style={linkStyle}>
				books
			</Link>
			<Link to="/add" style={linkStyle}>
				add book
			</Link>
		</nav>
	);
};

const App = () => {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path="/" element={<Navigate to="/authors" />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/books" element={<Books />} />
				<Route path="/add" element={<NewBook />} />
			</Routes>
		</Router>
	);
};

export default App;
