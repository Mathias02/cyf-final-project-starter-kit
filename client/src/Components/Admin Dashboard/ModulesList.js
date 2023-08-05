import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const ModulesList = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/get');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <div>
      <h2>Modules List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Module Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cohort</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.modulename}</td>
              <td>{module.startdate}</td>
              <td>{module.enddate}</td>
              <td>{module.cohort}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ModulesList;

