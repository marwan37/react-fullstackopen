const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let persons = require("./db.json");

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.json({
    p: `Phonebook has info for ${persons.length} people`,
    d: new Date().toString()
  });
});

app.get("/api/persons/:id", (req, res) => {
  const personId = parseInt(req.params.id, 10);
  let person = persons.find(p => p.id === personId);

  if (!person) {
    return res.status(404).json({
      message: `Could not find person with id ${personId}`
    });
  }

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  } else if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: body.id
  };

  persons = persons.concat(person);

  res.json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const body = req.body;
  const personId = parseInt(req.params.id, 10);

  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = persons.find(p => p.id === personId);
  person.number = body.number;

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const personId = parseInt(req.params.id, 10);
  persons = persons.filter(p => p.id !== personId);

  res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
