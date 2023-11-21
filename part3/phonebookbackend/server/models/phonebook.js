const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log(url)
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   minlength: 3,
  //   required: true,
  // },
  // number: {
  //   type: String,
  //   validate: {
  //     validator: (v) => /^\d{2}-\d{6,}|\d{3}-\d{5,}|(?<!-)\d{8,}$/.test(v),
  //     message: (props) => `\`${props.value}\` is not a valid phone number.`,
  //   },
  //   minlength: 8,
  //   required: true,
  // },
  name: String,
  numberm: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)

