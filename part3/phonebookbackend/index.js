const { response } = require('express');
const express = require('express')
const app = express()

let phonebooks = [
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

app.use(express.json())

// Route to get the request time and phonebook entries
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
  `<p>Phonebook has information for ${phonebooks.length} people</p> 
  <p> ${date} </p>`
  )

});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const book = phonebooks.find(book => book.id === id)

  if(book) {
    res.json(book)
  }
  else {
    res.status(404).end()
  }
}) 

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(phonebooks)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebooks = phonebooks.filter(book => book.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})