import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import moment from 'moment';
import "./modules.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ModulesListTable from "./ModulesList";

const Modules = () => {
  // STATE
  const [moduleName, setModuleName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cohortName, setCohortName] = useState("");

  // SUBMIT FUNCTION
  const insertModule = async () => {
    try {
      const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
      const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

      const response = await axios.post('/api/insert', {
        moduleName: moduleName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        cohort: cohortName,
      });
      console.log('Data inserted successfully!', response.data);
      // Do something with the response data if needed
    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle the error
    }
  };

  //GET FUNCTION
  const ModulesListTable = () => { // Rename the component here
    const [modules, setModules] = useState([]);

    useEffect(() => {
      // Fetch data from the server when the component mounts
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

    // DELETE FUNCTION
  const deleteModule = async (moduleId) => {
    try {
      await axios.delete(`/api/delete/${moduleId}`);
      setModules(modules.filter((module) => module.id !== moduleId));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

    return (
      <div>
      <Navbar />
      <h3>Hello Admin, below you can update modules</h3>
      <div className='form'>
        {/* ... Input fields and submit button ... */}

        {/* Modules List Table */}
        <div style={{ margin: 'auto', width: '50%' }}>
          <h2>Modules List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Cohort</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.modulename}</td>
                  <td>{module.startdate}</td>
                  <td>{module.enddate}</td>
                  <td>{module.cohort}</td>
                  <td>
                    <button onClick={() => deleteModule(module.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <Footer />
    </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h3>Hello Admin, below you can update modules</h3>
      <div className='form'>
        <input type='text' placeholder='Enter Module Name' name='moduleName' onChange={(e) => {
          setModuleName(e.target.value);
        }} />
        <input type='date' placeholder='Enter Start Date' name='startDate' onChange={(e) => {
          setStartDate(e.target.value);
        }} />
        <input type='date' placeholder='Enter End Date' name='endDate' onChange={(e) => {
          setEndDate(e.target.value);
        }} />
        <input type='text' placeholder='Enter Cohort Name' name='cohortName' onChange={(e) => {
          setCohortName(e.target.value);
        }} />
        <button onClick={insertModule}>Submit</button>
      </div>
      <ModulesListTable />
      <Footer />
    </div>
  );
};

export default Modules;
