import React from "react";

import PropTypes from "prop-types";

const Notification = ({ notification }) => {
	if (notification === null) {
		return;
	}
	return (
		<div
			className={`alert alert-${notification.type} fade show w-25 m-auto mb-4`}
			role="alert"
		>
			<strong>{notification.text}</strong>
		</div>
	);
};

Notification.propTypes = {
	notification: PropTypes.shape({
		type: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	}),
};

export default Notification;
