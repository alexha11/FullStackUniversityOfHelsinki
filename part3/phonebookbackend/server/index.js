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
app.get('/info', (req, res) => {
  Person.find({}).then(result => {
    res.send(`<p>Phonebook has info for ${result.length} people</p>
    <p>${Date()}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id)
  Person.findById(req.params.id)
  .then(person => {
    console.log(person)
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))  
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result =>{
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
  person.save()
  .then(data => {
    res.json(data)
  })
  .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const bodyData = request.body

  const newPerson = {
    name: bodyData.name,
    number: bodyData.number,
  }

  Person.findByIdAndUpdate(
    request.params.id, 
    newPerson,  
    { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})