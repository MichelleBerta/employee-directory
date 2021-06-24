import React, { useEffect, useState } from "react";
import "../App";
import * as ReactBootStrap from "react-bootstrap";
import SearchForm from "./SearchForm.js";
const axios = require("axios");

// add rendomusesr api
const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [employees2, setEmployees2] = useState([]);
  const [s, setS] = useState("asc");
  const [search, setSearch] = useState("");
  const getEmployees = () => {
    axios
      .get("https://randomuser.me/api/?results=10")
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

  const renderEmployee = (employee, index) => {
    return (
      <tr key={`${index}-emp`}>
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

  // filter/search employees
  const handleInputChange = (event) => {
    console.log(event);
    const value = event.target.value;
    if (value.length > 0) {
      const newEmployees = employees;
      const filteredEmployees = newEmployees.filter((employee, i) => {
        return employee.name.last.toLowerCase().includes(value.toLowerCase());
      });
      setEmployees2(filteredEmployees);
    } else {
      setEmployees2(employees);
    }

    setSearch(event.target.value);
  };

  // sort employees
  const handleClick = (event) => {
    event.preventDefault();
    if (s === "asc") {
      const sortedEmployees = employees.sort((employee1, employee2) => {
        const name1 = employee1.name.first.toLowerCase();
        const name2 = employee2.name.first.toLowerCase();
        if (name1 > name2) {
          return -1;
        } else if (name2 > name1) {
          return 1;
        }
      });
      console.log(sortedEmployees[0].name);
      setEmployees2(sortedEmployees);
      setS("dsc");
    } else {
      const sortedEmployees = employees.sort((employee1, employee2) => {
        const name1 = employee1.name.first.toLowerCase();
        const name2 = employee2.name.first.toLowerCase();
        if (name1 > name2) {
          return 1;
        } else if (name2 > name1) {
          return -1;
        }
      });
      console.log(sortedEmployees[0].name);
      setEmployees2(sortedEmployees);
      setS("asc");
    }
    console.log(s);
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
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Image
            </th>
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Gender
            </th>
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Name
            </th>
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Phone
            </th>
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Email
            </th>
            <th
              onClick={(e) => {
                console.log(e);
                handleClick(e);
              }}
            >
              Location
            </th>
          </tr>
        </thead>
        <tbody>{employees2.map(renderEmployee)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default Table;
