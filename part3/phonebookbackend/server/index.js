const { response } = require('express');
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/phonebook')

app.use(cors()) // Cross-Origin Resource Sharing can be enabled with the cors middleware.
app.use(express.static('dist')) // The build directory of the frontend is served with the express.static middleware.

app.use(express.json())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

// Route to get the request time and phonebook entries
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
  `<p>Phonebook has information for ${Person.length} people</p> 
  <p> ${date} </p>`
  )

});

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const book = Person.find(book => book.id === id)

  if(book) {
    res.json(book)
  }
  else {
    res.status(404).end()
  }
}) 

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  Person = Person.filter(book => book.id !== id)
  response.status(204).end()
})

const generateID = (max) => {
  return Math.floor(Math.random() * max);
}

app.post('/api/persons', (req, res) => {
  const bodyData = req.body
  if(!bodyData.name) {
    return(res.status(404).json({
      error: 'name is missing'
    }))
  }

  if(!bodyData.number) {
    return(res.status(404).json({
      error: 'number is missing'
    }))
  }
  
  // if(Person.find((book) => book.name === bodyData.name)) {
  //   return(res.status(404).json({
  //     error: 'name must be unique',
  //   }))
  // }

  const person = new Person({
    name: bodyData.name,
    number: bodyData.number
  })
  person.save().then(data => {
    res.json(data)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})