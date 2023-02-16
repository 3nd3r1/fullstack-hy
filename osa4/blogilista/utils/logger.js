const info = (...params) => {
	if (process.env.NODE_ENV !== "test") {
		console.log("[INFO]: ", ...params);
	}
};

const error = (...params) => {
	if (process.env.NODE_ENV !== "test") {
		console.error("[ERROR]: ", ...params);
	}
};

const debug = (...params) => {
	if (process.env.NODE_ENV === "development") {
		console.debug("[DEBUG]: ", ...params);
	}
};

module.exports = {
	info,
	error,
	debug,
};
