import React, {useEffect, useState} from 'react';
import '../App';
import * as ReactBootStrap from "react-bootstrap";
import SearchForm from './SearchForm.js';
const axios = require('axios');


const Table = () => {
const [employees, setEmployees] = useState([])
const [employees2, setEmployees2] = useState([])
const [search, setSearch] = useState("")
  const getEmployees = () =>{
    axios.get('https://randomuser.me/api/?results=10')
    .then(function (response) {
      // handle success
      console.log(response);
      setEmployees ( response.data.results )
      setEmployees2 ( response.data.results )
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  
  }

const renderEmployee = (employee, index) => {
  return(
    <tr key={index}>
      <td><img src={employee.picture.medium} alt=""/></td>
      <td>{`${employee.gender}`}</td>
      <td>{`${employee.name.first} ${employee.name.last}`}</td>
      <td>{`${employee.phone}`}</td>
      <td>{`${employee.email}`}</td>
      <td>{`${employee.location.city}, ${employee.location.state}`}</td>
    </tr>
  )
}
const handleInputChange=(event) => {
  console.log (event)
  const value=event.target.value
  if (value.length > 0) {
    const filteredEmployees = employees.filter((employee,i)=>{
      return employee.name.last.toLowerCase().includes(value.toLowerCase())
      })
      setEmployees2(filteredEmployees)
  }
  else {
    setEmployees2(employees)
  }
  
  setSearch(event.target.value)
}

const handleClick = (event) => {
  setEmployees2(
  employees.sort((a, b) => {return (a.name.last > b.name.last) ? 1 : 0}))
}

useEffect(() => {
  if (!employees) {
    return;
  }
getEmployees()
},[]) 
  return (
   
<div className="App">
<SearchForm  value={search} handleInputChange={handleInputChange}/>;
      <ReactBootStrap.Table striped bordered hover variant="dark">

  <thead>
    <tr>
      <th>Image</th>
      <th>Gender</th>
      <th onClick={handleClick}>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    {employees2.map(renderEmployee)}
  </tbody>
</ReactBootStrap.Table>
    </div>

   );
}

export default Table;
