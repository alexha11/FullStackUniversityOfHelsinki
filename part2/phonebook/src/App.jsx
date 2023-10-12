import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }//Fix a little bit 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  console.log(persons.name)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit="addName">
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => (
          <p>
            {person.name}
          </p>
        ))}
    </div>
  )
}

export default App