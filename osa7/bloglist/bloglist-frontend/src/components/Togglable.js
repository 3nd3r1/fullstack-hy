import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div className="mb-4">
			<div
				style={hideWhenVisible}
				className="text-center max-w-xl mx-auto"
			>
				<button
					className="w-full bg-neutral-700 font-bold py-2 rounded-md shadow-md hover:bg-neutral-600 transition-colors"
					onClick={toggleVisibility}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible} className="text-center">
				{props.children}
				<button
					className="bg-red-600 hover:bg-red-500 mt-2 p-1 w-full rounded-md shadow-md font-bold"
					onClick={toggleVisibility}
				>
					Cancel
				</button>
			</div>
		</div>
	);
});

Togglable.displayName = "Togglable";

export default Togglable;
