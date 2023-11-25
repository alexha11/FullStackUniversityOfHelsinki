const mongoose = require('mongoose')

const password = process.argv[2]
const namePerson = process.argv[3]
const numPerson = process.argv[4]

const url =
  `mongodb+srv://thanhduonghd114:${password}@cluster0.iv707px.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: namePerson,
  number: numPerson,
})

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
    //console(result)
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  //process.exit(1)
}
if(process.argv.length === 5){
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}