import { useState, useEffect } from 'react'
import pplService from './services/people'

const Notification = ({ message }) => {
  const notestyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

  if (message === null) {
    return null
  }

  return (
    <div style={notestyle} >
      {message}
    </div>
  )
}

const Searcher = ({search,onEditSearch}) => {
  return(
    <>
    Search:
    <input value={search} onChange={onEditSearch}/>
    </>
  )
}

const Adder = ({onAdd,onEditname,newName,newNumber,onEditnumber}) => {
  return(
    <>
    <form onSubmit={onAdd}>
        <div>
          name: <input value={newName} onChange={onEditname}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onEditnumber}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({persons,onDelete}) => {
  return(
    <>
    <ul>
      {persons.map((guy)=> <li key={guy.name} >{guy.name} {guy.number}<button onClick={()=>onDelete(guy.id,guy.name)}>delete</button></li>)}
    </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  ]) 
  const [personstoshow, setPersonstoshow] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    pplService
      .getAll()
      .then(response => {
        setPersons(response)
        setPersonstoshow(response)
      })
      }
  , [])

  const onAdd = (event) => {
    event.preventDefault()
    const found = persons.find((guy)=>guy.name === newName)
    if( found != undefined ){
      if(window.confirm(`${newName} is already added to phonebook, change number?`)){

        pplService
        .update(found.id, {name: newName, number: newNumber})
        .then(returnedguy => {
          setPersons(persons.filter(item => item.id != returnedguy.id ).concat(returnedguy))
          setPersonstoshow(personstoshow.filter(item => item.id != returnedguy.id ).concat(returnedguy))
      })
      setNewName('')
      setNewNumber('')
      }
    }
    else{
      pplService
      .create({name: newName, number: newNumber})
      .then(returnedguy => {
        
        setPersons(personstoshow.concat(returnedguy))
        setPersonstoshow(personstoshow.concat(returnedguy))

        setErrorMessage(
          ` ${newName} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
    setNewName('')
    setNewNumber('')
    }
  }

  const onDelete = (id,name) => {
    if (window.confirm(`delete ${name} ?`)) {
      pplService
      .remove(id)
      .then(returnedguy => {
        setPersons(persons.filter(item => item.id != returnedguy.id ))
        setPersonstoshow(personstoshow.filter(item => item.id != returnedguy.id ))
      })
    }
    
  }

  const onEditname = (event) => {
    setNewName(event.target.value)
  }
  const onEditnumber = (event) => {
    setNewNumber(event.target.value)
  }
  const onEditSearch = (event) => {
    setSearch(event.target.value)
    setPersonstoshow(persons.filter(guy => guy.name.includes(event.target.value)))
  }

  return (
    <div>
      <Notification message={errorMessage}></Notification>

      <h2>Phonebook</h2>
      <Searcher search = {search} onEditSearch={onEditSearch}></Searcher>
      
      <h2>Add a new</h2>
      <Adder onAdd={onAdd} onEditname={onEditname} newName={newName} newNumber={newNumber} onEditnumber={onEditnumber} ></Adder>
      
      <h2>Numbers</h2>
      <Persons persons={personstoshow} onDelete={onDelete}></Persons>
      
    </div>
  )
}

export default App