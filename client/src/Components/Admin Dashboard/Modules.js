import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./modules.css";
import axios from "axios"; // Change import statement here

const Modules = () => {
  // STATE
  const [moduleName, setModuleName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cohortName, setCohortName] = useState("");

  // SUBMIT FUNCTION
  const insertModule = async (data) => {
    try {
      const response = await axios.post("/modules", data);
      console.log("Data inserted successfully!");
      // Do something with the response if needed
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle the error

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h3>Hello volunteer, below you can update modules</h3>
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
        <button onClick={() => insertModule({
          moduleName: moduleName,
          startDate: startDate,
          endDate: endDate,
          cohort: cohortName,
        })}> Submit </button>
      </div>
      <Footer />
    </div>
  );
};

export default Modules;
