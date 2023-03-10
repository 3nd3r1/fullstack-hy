require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('body', (req) => (JSON.stringify(req.body) !== '{}' ? JSON.stringify(req.body) : ''));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => res.json(people))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name and number must be specified' });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  return Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name and number must be specified' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  return person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

/*
app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br></br> ${Date()}`);
});
*/

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' });
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
