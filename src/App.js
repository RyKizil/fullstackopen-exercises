import React, { useState, useEffect, Fragment } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
 
  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const changeNumber = () => {
    const p = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
    const changedPerson = { ...p, number: phoneNumber }

    personService
      .update(p.id, changedPerson)
        .then(returnedPerson => {setPersons(persons.map(pers => pers.id !== p.id ? pers : returnedPerson))      })
  }

  const handleSubmit = e => {
      e.preventDefault();
      let exists = false;
      persons.forEach(person => {
          if(person.name.toLowerCase() === newName.toLowerCase()){
            if(window.confirm(`${newName} is already added in the phonebook, replace the old number with new one?`)){
              changeNumber();
              exists = true;
            }
          }   
      })
      if(!exists){
        const personObj = {
          name: newName,
          number: phoneNumber,
          id: Math.max(...persons.map(person => person.id), 0) + 1
        }  
  
        personService.create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setPhoneNumber('');
        })  
      }
      
  }

  const handleDelete = (e) => {
    const name = e.target.getAttribute("name");
    const personId = Number(e.target.getAttribute("personid"));
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      setPersons(persons.filter(p => p.id !== personId));
    axios.delete(`http://localhost:3001/persons/${personId}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      
    }
    
     
   };


  

  return (
    <div>
      <h2>Phonebook</h2>
     <SearchBar  persons={persons}/>
     <h2>Add New</h2>
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
                 <Fragment key={i}>
                   <span >{person.name} {person.number}  </span><button name={person.name} onClick={handleDelete} personid={person.id}>delete</button><br/>
                  </Fragment>
               )
           })
           
       }
    </div>
  )
}

export default App;