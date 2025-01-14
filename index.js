require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/db");
const Person = require("./models/person.model");

const app = express();

const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());

app.get("/hello.html", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, { new: true }).then((returnedPerson) => {
    res.json(returnedPerson);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findOneAndDelete(id).then(() => {
    res.status(204).end();
  });
});

app.get("/info", (req, res) => {
  const numOfPersons = persons.length;
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${numOfPersons} people</p><p>${date.getDate()}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
