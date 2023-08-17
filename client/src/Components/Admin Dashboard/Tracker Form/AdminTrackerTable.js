import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminTrackerTable = () => {
    const [progressData, setProgressData] = useState([]);
    const [formData, setFormData] = useState({
        milestones: "",
        date: "",
        required_pull_requests: "",
        codewars: "",
        cohort: ""
    });

    useEffect(() => {
        fetchProgressData();
    }, []);

    const fetchProgressData = async () => {
        try {
            const response = await axios.get("/api/traineeProgress");
            setProgressData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/traineeProgress", formData);
            console.log("Inserted row:", response.data);
            fetchProgressData();
        } catch (error) {
            console.error("Error inserting trainee progress:", error);
            // Handle the error, show an error message, etc.
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(`/api/traineeProgress/${id}`, formData);
            console.log("Updated row:", response.data);
            fetchProgressData();
        } catch (error) {
            console.error("Error updating trainee progress:", error);
            // Handle the error, show an error message, etc.
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/traineeProgress/${id}`);
            console.log("Deleted row:", id);
            fetchProgressData(); // Fetch data again to reflect the deleted row
        } catch (error) {
            console.error("Error deleting trainee progress:", error);
            // Handle the error, show an error message, etc.
        }
    };

    return (
        <div>
            <div>
                <h2>Insert Trainee Progress</h2>
                <form onSubmit={handleSubmit}>
                    <label>Milestones:</label>
                    <input type="text" name="milestones" value={formData.milestones} onChange={handleChange} /><br />

                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} /><br />

                    <label>Required Pull Requests:</label>
                    <input type="number" name="required_pull_requests" value={formData.required_pull_requests} onChange={handleChange} /><br />

                    <label>Codewars:</label>
                    <input type="number" name="codewars" value={formData.codewars} onChange={handleChange} /><br />

                    <label>Cohort:</label>
                    <input type="text" name="cohort" value={formData.cohort} onChange={handleChange} /><br />

                    <button type="submit">Insert</button>
                </form>
            </div>

            <div className="trainee-tracker-container">
                <table className="tracker-table">
                    <thead>
                        <tr>
                            <th>Milestones</th>
                            <th>Date</th>
                            <th>Required Pull Requests</th>
                            <th>Codewars</th>
                            <th>Cohort</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progressData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.milestones}</td>
                                <td>{new Date(entry.date).toLocaleDateString()}</td>
                                <td>{entry.required_pull_requests}</td>
                                <td>{entry.codewars}</td>
                                <td>{entry.cohort}</td>
                                <td>
                                    <button onClick={() => handleUpdate(entry.id)}>Update</button>
                                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTrackerTable;

