// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import './TrackProgress.css';

// const TrackProgress = () => {
//     return(
//         <div>
//             <Navbar />
//             <div className="progress_box">
//                 <h1>Hello volunteer, below you can track trainee progress</h1>
//                 <div className="progress_container">
//                     <form className="trainee_form">
//                         <label htmlFor="cohort">Cohort Name: </label>
//                         <input type="text" id="cohort" className="cohort_name" name="cohort" placeholder="Enter Cohort Name" require />
//                         <input type="submit" className="trainee_submit" value="submit" />
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default TrackProgress;
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TrackProgress.css";
import TraineeTracker from "../Trainee Dashboard/TraineeTracker";
import { Link } from "react-router-dom";

const TrackProgress = () => {
	const [username, setUsername] = useState("");
	const [showTracker, setShowTracker] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowTracker(true);
	};

	return (
		<div>
			<Navbar />
			<div className="progress_box">
				<h1>Hello volunteer, below you can Enter Trainee Github Username</h1>
				<div className="progress_container">
					{showTracker ? (
						<TraineeTracker user={username} />
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
							<Link to="/track-trainee-progress-milestone">
								<button type="submit" className="trainee_submit">
									Submit
								</button>
							</Link>
						</form>
					)}
				</div>
			</div>
			{showTracker ? null : <Footer />}
		</div>
	);
};

export default TrackProgress;
