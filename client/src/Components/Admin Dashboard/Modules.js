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
  const [modules, setModules] = useState([]); // Existing state for modules
  const [editingModuleId, setEditingModuleId] = useState(null); // Add this line
  const [editedModuleName, setEditedModuleName] = useState(""); // Add this line
  const [editedStartDate, setEditedStartDate] = useState(""); // Add this line
  const [editedEndDate, setEditedEndDate] = useState(""); // Add this line
  const [editedCohortName, setEditedCohortName] = useState("");

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

  // Handle the delete click
  const handleDeleteClick = async (moduleId) => {
    try {
      await axios.delete(`/api/delete/${moduleId}`);
      fetchModules(); // Fetch modules again after deletion
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  //PUT FUNCTION

  // Handle the edit click
  const handleEditClick = (moduleId) => {
    setEditingModuleId(moduleId);
  };

  // Handle the save click (update module)
  const handleSaveClick = async (moduleId) => {
    try {
      // Get the updated values from the state
      const updatedModule = {
        moduleName: editedModuleName,
        startDate: moment(editedStartDate).format('YYYY-MM-DD'),
        endDate: moment(editedEndDate).format('YYYY-MM-DD'),
        cohort: editedCohortName,
      };

      // Send the PUT request to update the module
      await axios.put(`/api/update/${moduleId}`, updatedModule);
      // Reset the editingModuleId and fetch modules again after updating
      setEditingModuleId(null);
      fetchModules();
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

    return (
      <div>
      {/* ... (previous code) ... */}
      <div className='form'>
        {/* ... Input fields and submit button ... */}

        {/* Modules List Table */}
        <div style={{ margin: 'auto', width: '80%' }}>
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
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="text"
                        value={editedModuleName}
                        onChange={(e) => setEditedModuleName(e.target.value)}
                      />
                    ) : (
                      module.modulename
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="date"
                        value={editedStartDate}
                        onChange={(e) => setEditedStartDate(e.target.value)}
                      />
                    ) : (
                      moment(module.startdate).format('YYYY-MM-DD')
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="date"
                        value={editedEndDate}
                        onChange={(e) => setEditedEndDate(e.target.value)}
                      />
                    ) : (
                      moment(module.enddate).format('YYYY-MM-DD')
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="text"
                        value={editedCohortName}
                        onChange={(e) => setEditedCohortName(e.target.value)}
                      />
                    ) : (
                      module.cohort
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <div>
                        <button onClick={() => handleSaveClick(module.id)}>Save</button>
                        <button onClick={() => setEditingModuleId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(module.id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(module.id)}>Delete</button>
                      </>
                    )}
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
