
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './DashboardHome.css';


const DashboardHome = () => {
  return (
    <div>
<Navbar />

<div className='adminBtn'>
      <button className="btnlogin">

        Hi Admin, welcome to your dashboard!
      </button>
  </div>

{/* Log in buttons */}
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
      <div style={{ display: "flex", gap: "100px" }}>
        {/* Use absolute paths starting with a forward slash */}
        <Link to="/update-modules">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Update Modules</button>
        </Link>
        <Link to="/track-trainee-progress">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Track Trainee Progress</button>
        </Link>
      </div>
    </div>
<Footer />
    </div>
  );
};

export default DashboardHome;