import React, {useEffect, useState} from 'react';
import '../App';
import * as ReactBootStrap from "react-bootstrap";
const axios = require('axios');


const Table = () => {
const [employees, setEmployees] = useState([])
  const getEmployees = () =>{
    axios.get('https://randomuser.me/api/?results=10')
    .then(function (response) {
      // handle success
      console.log(response);
      setEmployees ( response.data.results )
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
      <td><img src={employee.picture.thumbnail} alt=""/></td>
      <td>{`${employee.name.first} ${employee.name.last}`}</td>
      <td>{`${employee.phone}`}</td>
      <td>{`${employee.email}`}</td>
      <td>{`${employee.dob.date}`}</td>
    </tr>
  )
}
useEffect(() => {
  if (!employees) {
    return;
  }
getEmployees()
},[]) 
  return (
    <div className="App">
      <ReactBootStrap.Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>DOB</th>
    </tr>
  </thead>
  <tbody>
    {employees.map(renderEmployee)}
  </tbody>
</ReactBootStrap.Table>
    </div>

   );
}

export default Table;
