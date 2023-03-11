const { response } = require("express")
const express = require("express")

const app = express()
const port = 3001

app.listen(port, () => console.log(`Server is running on port ${port}.`))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.send(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get("/info", (req, res) => {
    const currentTime = new Date();
    res.send(`Phonebook has info for ${persons.length} people. <br/> ${currentTime}`)
})


const generateId = () => {
    return Math.floor(Math.random() * 1000) + 1
}

app.use(express.json())
app.post("/api/persons", (req, res) => {
    let body = req.body
    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' })
    }
    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' })
    }
    if (persons.find(contact => contact.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(contact)
    res.json(persons)
})