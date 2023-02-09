const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122",
	},
];

const generateId = () => {
	let id = 1;
	while (persons.find((person) => person.id === id)) {
		id = Math.floor(Math.random() * 1e9);
	}
	return id;
};

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
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	const person = persons.find(
		(person) => person.id === Number(req.params.id)
	);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete("/api/persons/:id", (req, res) => {
	persons = persons.filter((person) => person.id !== Number(req.params.id));

	res.status(204).end();
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res
			.status(400)
			.json({ error: "name and number must be specified" });
	}

	if (persons.find((person) => person.name === body.name)) {
		return res.status(400).json({ error: "name must be unique" });
	}

	newPerson = { id: generateId(), ...body };
	persons = persons.concat(newPerson);

	res.json(newPerson);
});

app.get("/info", (req, res) => {
	res.send(
		`Phonebook has info for ${persons.length} people <br></br> ${Date()}`
	);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
