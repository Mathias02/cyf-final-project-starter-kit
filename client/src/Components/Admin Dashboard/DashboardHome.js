
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./DashboardHome.css";
import BackButton from "../BackButton/BackButton";


const DashboardHome = () => {
  return (
<div>
      <Navbar />
      <BackButton />

<div className='adminBtn'>
      <button className="btnlogin">

        Hi Admin, welcome to your dashboard!
      </button>
</div>

{/* Log in buttons */}

<div className='adminbody'>
      <div className='admindiv'>
        {/* Use absolute paths starting with a forward slash */}
        <Link to="/update-modules">
          <button className='adminbodybtn' >Update Modules</button>
        </Link>
        <Link to="/track-trainee-progress">
          <button>Track Trainee Progress</button>

        </Link>
      </div>
  </div>
<Footer />
</div>
  );
};

export default DashboardHome;