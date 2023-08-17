import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TrackProgress.css";

const TrackProgress = () => {
	const [username, setUsername] = useState("");
	const [entry, setEntry] = useState({});
	const [codewars, setCodewars] = useState({});
	const [cohort, setCohort] = useState({});
	const [showTracker, setShowTracker] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Fetch data from GitHub API
		try {
			const githubResponse = await fetch(
				`https://api.github.com/search/issues?q=is:pr%20author:${username}%20user:codeyourfuture`
			);
			const githubData = await githubResponse.json();
			setEntry(githubData);
		} catch (error) {
			console.error("Error fetching GitHub data:", error);
		}

		// Fetch data from CodeWars API
		try {
			const codewarsResponse = await fetch(
				`https://www.codewars.com/api/v1/users/${username}`
			);
			const codewarsData = await codewarsResponse.json();
			setCodewars(codewarsData);
		} catch (error) {
			console.error("Error fetching CodeWars data:", error);
		}

		setCohort({}); // Reset cohort data
		setShowTracker(true);
	};

	return (
		<div>
			<Navbar />
			<div className="progress_box">
				{!showTracker && (
					<h1>Hello volunteer, below you can Enter Trainee Github Username</h1>
				)}
				<div className="progress_container">
					{showTracker ? (
						<div className="tracker">
							<h1>Hello volunteer Below is {username} Tracked Progress</h1>
							<div className="tabcontainer">
								<table className="tab">
									<thead>
										<tr>
											<th>PRs</th>
											<th>CodeWars</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{entry?.total_count || "Loading..."}</td>
											<td>{codewars?.honor || "Loading..."}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<form className="trainee_form" onSubmit={handleSubmit}>
							<label htmlFor="cohort">Github Name: </label>
							<input
								type="text"
								id="cohort"
								className="cohort_name"
								name="cohort"
								placeholder="Enter Github UserName"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							<button type="submit" className="trainee_submit">
								Submit
							</button>
						</form>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);

};

export default TrackProgress;
