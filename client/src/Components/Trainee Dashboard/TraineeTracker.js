import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TraineeTracker.css";

const TraineeTracker = ({ user }) => {
    const [githubData, setGithubData] = useState(null);
    const [codewars, setCodewars] = useState(null);
    const [cohort, setCohort] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub data
        fetch(`https://api.github.com/search/issues?q=is:pr%20author:${user}%20user:codeyourfuture`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log("Wrong username or other error with the GitHub API.");
                    throw new Error("Failed to fetch from GitHub");
                }
            })
            .then((data) => {
                setGithubData(data);

                // Fetch CodeWars data
                return fetch(`https://www.codewars.com/api/v1/users/${user}`);
            })
            .then((res) => res.json())
            .then((data) => {
                setCodewars(data);

                // Fetch cohort data
                return fetch(`/api/trainees?github_name=${user}`);
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0 && data[0].cohort) {
                    setCohort(data[0].cohort);
                } else {
                    console.log("No cohort data found for this user.");
                }
                setLoading(false); // Set loading to false after all fetch calls are done
            })
            .catch((err) => {
                console.error("Error:", err);
                setError(err.message || "An error occurred.");
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="tracker">
            <Navbar />
            <h1>Hello {user}, below is your tracked score</h1>
            <div className="tabcontainer">
                <table className="tab">
                    <thead>
                        <tr>
                            <th>GitHub PRs</th>
                            <th>CodeWars Honor</th>
                            <th>Cohort Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{githubData?.total_count || "Loading..."}</td>
                            <td>{codewars?.honor || "Loading..."}</td>
                            <td>{cohort?.name || "Loading..."}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default TraineeTracker;
