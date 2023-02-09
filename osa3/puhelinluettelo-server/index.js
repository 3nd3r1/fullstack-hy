require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

morgan.token("body", (req, res) =>
	JSON.stringify(req.body) !== "{}" ? JSON.stringify(req.body) : ""
);

app.use(cors());
app.use(express.static("build"));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body"
	)
);
app.use(express.json());

app.get("/api/persons", (req, res) => {
	Person.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res) => {
	Person.findById(req.params.id).then((result) => {
		if (result) {
			res.json(result);
		} else {
			res.status(404).end();
		}
	});
});

app.delete("/api/persons/:id", (req, res) => {
	Person.findByIdAndDelete(req.params.id).then((result) =>
		res.status(204).end()
	);
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res
			.status(400)
			.json({ error: "name and number must be specified" });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => res.json(savedPerson));
});

/*
app.get("/info", (req, res) => {
	res.send(
		`Phonebook has info for ${persons.length} people <br></br> ${Date()}`
	);
});
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
