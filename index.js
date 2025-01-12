const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const PORT = 3002;

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/hello.html", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const foundPerson = persons.find((person) => person.id === id);

  if (foundPerson) {
    res.json(foundPerson);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const newPerson = {
    id: uuidv4(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  res.json(persons);
});

app.put("/api/persons/:id", (req, res) => {
  const body = req.body;
  const id = res.params.id;

  const foundPerson = persons.find((person) => person.id === id);

  if (foundPerson) {
    const changedPerson = {
      ...foundPerson,
      name: body.name,
      number: body.number,
    };

    persons.map((person) => (person.id === id ? changedPerson : person));

    res.json(changedPerson);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const foundPerson = persons.find((person) => person.id === id);

  persons = persons.filter((person) => person.id !== id);

  res.status(204).json(foundPerson);
});

app.get("/info", (req, res) => {
  const numOfPersons = persons.length;
  const date = new Date();
  res.send(`<p>Phonebook has info for ${numOfPersons} people</p>
    <p>${date.getDate()}</p>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
