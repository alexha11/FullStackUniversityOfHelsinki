import React, { useState } from 'react';

const NameLists = ({ nameList }) => {
  return (
    <li>
      {nameList.name} {nameList.number}
    </li>
  );
};

const Header = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ];

  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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

  return (
    <div>
      <Header text="Phonebook" />
      <form>
        <div>
          name:{' '}
          <input value={filterName} onChange={handleInputChange} />
        </div>
      </form>
      <Header text="Add a new" />
      <form onSubmit={addInformation}>
        <div>
          name:{' '}
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text="Numbers" />
      {filteredPersons.map((person) => (
        <NameLists key={person.id} nameList={person} />
      ))}
    </div>
  );
};

export default App;
