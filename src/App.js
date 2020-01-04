import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
 


  const handleSubmit = e => {
      e.preventDefault();
      persons.forEach(person => {
          person.name.toLowerCase() === newName.toLowerCase() ?  alert(`${newName} already exists in phonebook`) :  setPersons(persons.concat({name: newName, number: phoneNumber}));
      })
     
      setNewName('');
      setPhoneNumber('');
  }


  

  return (
    <div>
      <h2>Phonebook</h2>
     <SearchBar  persons={persons}/>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>number: <input onChange={e => setPhoneNumber(e.target.value) } /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {
           persons.map( (person, i) => {
               return (
                   <p key={i}>{person.name} {person.number}</p>
               )
           })
           
       }
    </div>
  )
}

export default App;