import { useState } from 'react'

const NameLists = ({nameList}) => {
  return (
    <li>{nameList.name} {nameList.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-1234567'
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addInformation = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber, 
      id: persons.length + 1,
    }
    let ok = true
    for(let i = 0; i < persons.length; i++) {
      if(persons[i].name === newName) {
        alert(newName + ' is already added to phonebook')
        ok = false
      }
    }
    if (ok) {
      setPersons(persons.concat(nameObject))
    }
    //console.log(persons.name[0])
    setNewName('')
    setNewNumber('')
  }//Fix a little bit 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  //console.log(persons.name)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addInformation}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value= {newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => (
          <NameLists key={person.id} nameList={person}/>
        ))}
    </div>
  )
}

export default App