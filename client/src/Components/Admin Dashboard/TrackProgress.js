import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './TrackProgress.css';
import AdminTrackerTable from "./AdminTrackerTable";

const TrackProgress = () => {
    return(
        <div>
            <Navbar />
            <div className="progress_box">
                <h1>Hello volunteer, below you can track trainee progress</h1>
            </div>
<AdminTrackerTable />
            <Footer />
        </div>
    );
};

export default TrackProgress;