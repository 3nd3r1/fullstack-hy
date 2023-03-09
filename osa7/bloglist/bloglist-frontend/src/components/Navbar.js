import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavEntry = ({ text, url }) => {
	return (
		<NavLink
			to={url}
			className="text-lg hover:text-white transition-colors"
		>
			{text}
		</NavLink>
	);
};

const Navbar = () => {
	const user = useSelector((state) => state.user);

	return (
		<div className="w-full mb-10">
			<div className="max-w-4xl bg-neutral-900 mx-auto p-3 flex flex-row items-center">
				<Link to="/">
					<h1 className="text-3xl font-bold mr-12">Bloglist</h1>
				</Link>
				<div className="flex flex-row justify-between grow items-center">
					<div className="flex flex-row gap-2">
						<NavEntry text="Blogs" url="/blogs" />
						<NavEntry text="Users" url="/users" />
					</div>
					{user ? (
						<div className="flex flex-row justify-center px-5 gap-3">
							<h4 className="mt-1">
								Logged in as <strong>{user.username}</strong>
							</h4>
							<Link
								to="/logout"
								className="bg-neutral-700 hover:bg-neutral-600  p-1 rounded-md font-bold shadow-md transition-colors"
							>
								Log Out
							</Link>
						</div>
					) : (
						<div className="flex flex-row justify-center px-5">
							<Link
								to="/login"
								className="bg-neutral-700 hover:bg-neutral-600  p-1 rounded-md font-bold shadow-md transition-colors"
							>
								Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
