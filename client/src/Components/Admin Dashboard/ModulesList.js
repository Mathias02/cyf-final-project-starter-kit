import React, { useState, useEffect } from "react";
import BackNav from "../Navbar/BackNav";
import Footer from "../Footer/Footer";
import moment from "moment";
import "./modules.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ModulesListTable from "./ModulesList";

const Modules = () => {
  // STATE
  const [moduleName, setModuleName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cohortName, setCohortName] = useState("");
  const [modules, setModules] = useState([]);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editedModuleName, setEditedModuleName] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedCohortName, setEditedCohortName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  // SUBMIT FUNCTION
  const insertModule = async (event) => {
    event.preventDefault();
    try {
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

      const response = await axios.post("/api/insert", {
        moduleName: moduleName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        cohort: cohortName,
      });
      console.log("Data inserted successfully!", response.data);
      fetchModules(); // Fetch modules again after insertion
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  //GET FUNCTION
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get("/api/get");
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // DELETE FUNCTION
  const handleDeleteClick = async (moduleId) => {
    try {
      await axios.delete(`/api/delete/${moduleId}`);
      fetchModules(); // Fetch modules again after deletion
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  //PUT FUNCTION
  const handleEditClick = (moduleId) => {
    setEditingModuleId(moduleId);
  };

  const handleSaveClick = async (moduleId) => {
    try {
      const updatedModule = {
        moduleName: editedModuleName,
        startDate: moment(editedStartDate).format("YYYY-MM-DD"),
        endDate: moment(editedEndDate).format("YYYY-MM-DD"),
        cohort: editedCohortName,
      };
      await axios.put(`/api/update/${moduleId}`, updatedModule);
      setEditingModuleId(null);
      fetchModules(); // Fetch modules again after updating
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  return (
    <div>
      <BackNav />
      <h3>Hello Admin, below you can update modules</h3>
      <div className='form'>
        <form onSubmit={insertModule}>
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
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div style={{ margin: "auto", width: "80%" }}>
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
                    moment(module.startdate).format("YYYY-MM-DD")
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
                    moment(module.enddate).format("YYYY-MM-DD")
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
      <Footer />
    </div>
  );
};

export default Modules;