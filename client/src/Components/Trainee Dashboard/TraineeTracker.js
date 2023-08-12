import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TraineeTracker.css";

const TraineeTracker = ({ user }) => {
    const [githubData, setGithubData] = useState(null);
    const [codewars, setCodewars] = useState(null);
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
        fetch(`https://api.github.com/search/issues?q=is:pr%20author:${user}%20user:codeyourfuture`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log("Wrong username or other error with the GitHub API.");
                    throw new Error("Failed to fetch from GitHub");
                }
            })
            .then((data) => setGithubData(data)); // Fixed from setEntry to setGithubData
    },[user]);

    useEffect(() => {
        fetch(`https://www.codewars.com/api/v1/users/${user}`)
            .then((res) => res.json())
            .then((data) => setCodewars(data))
            .catch((error) => console.error("Error fetching data from CodeWars:", error));
    }, [user]);

    useEffect(() => {
        // Fetch cohort information for the given user (GitHub username)
        fetch(`/api/trainees?github_name=${user}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0 && data[0].cohort) {
                    // Set the cohort state with the cohort information
                    setCohort(data[0].cohort);
                } else {
                    console.log("No cohort data found for this user.");
                }
            })
            .catch((error) => console.error("Error fetching cohort data:", error));
    }, [user]);

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
