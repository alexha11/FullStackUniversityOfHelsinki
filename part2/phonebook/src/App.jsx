import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const Notification = ({message, cssStyle}) => {
    if(message === null) {
      return null
    }
    return(
      <div className={cssStyle}>
        {message}
      </div>
    )
  }

  const addInformation = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    let foundPerson = persons.find((person) => person.name === newName)
    if (persons.find((person) => person.name === newName)) {
      window.confirm(foundPerson.name + ' is already added to phonebook, replace the old number with a new one?')
      console.log(foundPerson.id)
      personService
        .update(foundPerson.id, nameObject)
        .then(() => {
          setSuccessMessage('Changed the number of ' + newName)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
    } else {
      setSuccessMessage('Added ' + newName)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setPersons([...persons, nameObject]);
      personService.create(nameObject)

    }
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
   window.confirm('Delete ' + name + ' ?')
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

      <Notification message={successMessage} cssStyle={'success-message'}/>
      <Notification message={errorMessage} cssStyle={'failure-message'}/>
      <Filter filterName={filterName} handleInputChange={handleInputChange}/>

      <h3>Add a new</h3>

      <PersonForm addInformation={addInformation} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/> 
    </div>
  );
};

export default App;
//This one still need to change and modify
//Some errors:
// - Always delete the last name otherwise it causes some errors -> change this line id: persons.length + 1
// - Everytime delete or replace new number, have to reloade the page 
