import React, { useEffect, useState } from "react";
import "../App";
import * as ReactBootStrap from "react-bootstrap";
import SearchForm from "./SearchForm.js";
const axios = require("axios");

// add randomuser api data
const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [employees2, setEmployees2] = useState([]);
  const [search, setSearch] = useState("");
  const getEmployees = () => {
    axios
      .get("https://randomuser.me/api/?results=100")
      .then(function (response) {
        // handle success
        console.log(response);
        setEmployees(response.data.results);
        setEmployees2(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  // choose table columns
  const renderEmployee = (employee, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={employee.picture.medium} alt="" />
        </td>
        <td>{`${employee.gender}`}</td>
        <td>{`${employee.name.first} ${employee.name.last}`}</td>
        <td>{`${employee.phone}`}</td>
        <td>{`${employee.email}`}</td>
        <td>{`${employee.location.city}, ${employee.location.state}`}</td>
      </tr>
    );
  };

  // filter/search
  const handleInputChange = (event) => {
    console.log(event);
    const value = event.target.value;
    if (value.length > 0) {
      const filteredEmployees = employees.filter((employee, i) => {
        return employee.name.last.toLowerCase().includes(value.toLowerCase());
      });
      setEmployees2(filteredEmployees);
    } else {
      setEmployees2(employees);
    }

    setSearch(event.target.value);
  };

  // sorting
  const handleClick = (event) => {
    event.preventDefault();
    setEmployees(
      employees.sort((employee, employee2) => {
        if (employee.location.city < employee2.location.city) {
          return 1;
        }
        if (employee.location.city > employee2.location.city) {
          return -1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    if (!employees) {
      return;
    }
    getEmployees();
  }, []);
  return (
    <div className="App">
      <SearchForm value={search} handleInputChange={handleInputChange} />;
      <ReactBootStrap.Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Image</th>
            <th>Gender</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>
              <a href="button" onClick={handleClick}>
                Location
              </a>
            </th>
          </tr>
        </thead>
        <tbody>{employees2.map(renderEmployee)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default Table;
