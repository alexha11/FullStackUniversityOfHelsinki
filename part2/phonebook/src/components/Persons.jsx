const NameLists = ({nameList, handleDelete }) => {
    return (
      <li>
        {nameList.name} {nameList.number} <button onClick={handleDelete(nameList.id, nameList.name)}>delete</button>
      </li>
    );
  };
  
  
  const Persons = ({filteredPersons, handleDelete}) => {
    return(
      <div>
        {filteredPersons.map((person) => (
          <NameLists key={person.id} nameList={person} handleDelete={handleDelete}/>
        ))}
      </div>
    )
  }

  export default Persons;