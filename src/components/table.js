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

//done with Andrew

// const handleClick = (a, b) => {
//   setEmployees(
//   employees.sort((a, b) => {
//   if (a.employee.location.city > b.employee.location.city) {
//     return -1;
//   }
// return 0

  // if (a.employee.location.city < b.employee.location.city) {
  //   return 1;
  // }
// }))
// }

//experimenting

// const handleClick = (a,b) => {
//   setEmployees(
// employees.sort((a, b) => {
//   var locationA = a.employee.location.city.toUpperCase(); // ignore upper and lowercase
//   var locationB = b.employee.location.city.toUpperCase(); // ignore upper and lowercase
//   if (locationA < locationB) {
//     return -1;
//   }
//   if (locationA > locationB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// })
// )
// }


const handleClick = (a,b) => {
  setEmployees(
  employees.sort((a, b) => {
      if (a.location.city > b.location.city) {
          return 1;
      } else if (a.location.city < b.location.city) {
          return -1;
      } else {
          return 0;
      }
  })
  )}




console.log (handleClick);

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
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th><a href="button" onClick={handleClick}>Location</a></th>
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
