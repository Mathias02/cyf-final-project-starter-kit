import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './TrackProgress.css';

const TrackProgress = () => {
    return(
        <div>
            <Navbar />
            <div className="progress_box">
                <h1>Hello volunteer, below you can track trainee progress</h1>
                <div className="progress_container">
                    <form action="POST" className="trainee_form">                
                        <label htmlFor="">Cohort Name: 
                          <input type="text" className="cohort_name" name="trainee" placeholder="Enter Cohort Name" required/>
                        </label>
                        <label htmlFor="">Start Date: 
                          <input type="text" className="trainee_name" name='trainee' placeholder="Enter Start Date" required />
                        </label>
                        <label htmlFor="">End Date: 
                          <input type="text" className="trainee_name" name='trainee' placeholder="Enter End Date" required />
                        </label>
                        <input type="submit" className="trainee_submit" value="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrackProgress;