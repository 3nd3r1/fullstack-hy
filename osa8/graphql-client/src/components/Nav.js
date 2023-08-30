import { Link } from "react-router-dom";
import { useUser } from "../lib/context";

const linkStyle = {
	padding: "12px",
};
const navStyle = {
	boxShadow:
		"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	marginBottom: "5vh",
	paddingBottom: "8px",
	display: "inline-block",
};

const Nav = () => {
	const { token } = useUser();
	return (
		<div>
			<nav style={navStyle}>
				<Link to="/" style={linkStyle}>
					authors
				</Link>
				<Link to="/books" style={linkStyle}>
					books
				</Link>
				{token ? (
					<>
						<Link to="/add" style={linkStyle}>
							add book
						</Link>
						<Link to="/recommend" style={linkStyle}>
							recommended
						</Link>
						<Link to="/logout" style={linkStyle}>
							logout
						</Link>
					</>
				) : (
					<Link to="/login" style={linkStyle}>
						login
					</Link>
				)}
			</nav>
		</div>
	);
};

export default Nav;
