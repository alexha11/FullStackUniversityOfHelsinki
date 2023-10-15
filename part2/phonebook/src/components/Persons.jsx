const NameLists = ({ nameList }) => {
    return (
      <li>
        {nameList.name} {nameList.number}
      </li>
    );
  };
  
  
  const Persons = ({filteredPersons}) => {
    return(
      <div>
        {filteredPersons.map((person) => (
          <NameLists key={person.id} nameList={person} />
        ))}
      </div>
    )
  }

  export default Persons;