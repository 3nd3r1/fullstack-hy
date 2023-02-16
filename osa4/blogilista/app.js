const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

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

app.use("/api/blogs", blogsRouter);

module.exports = app;
