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
		<div className="py-3">
			<div style={hideWhenVisible} className="text-center">
				<button
					className="btn btn-secondary btn-block w-75"
					onClick={toggleVisibility}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible} className="text-center">
				{props.children}
				<button
					className="btn btn-danger btn-block w-75 mt-2"
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
