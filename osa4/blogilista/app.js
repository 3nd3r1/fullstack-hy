/* Utils */
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

/* Controllers */
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

/* MongoDB database connection */
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message);
	});

/* Express stuff */

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
