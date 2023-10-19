import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addInformation = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(newName + ' is already added to the phonebook');
    } else {
      setPersons([...persons, nameObject]);
    }
    
    personService.create(nameObject)
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleInputChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleDelete = (id, name) => {
   // window.confirm('Delete ' + name + ' ?')
      personService
      .remove(id).then((deletedPersons => {
        setPersons(
          persons.filter((person) => person.name !== deletedPersons.name)
        )
      }))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleInputChange={handleInputChange}/>

      <h3>Add a new</h3>

      <PersonForm addInformation={addInformation} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/> 
    </div>
  );
};


export default App;
