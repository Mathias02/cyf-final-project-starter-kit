import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const BackNav = () => {

  const handleEmailButtonClick = () => {
    window.location.href = "mailto:recipient@example.com";
  };

  const navigate = useNavigate();

  const goBack = () => {
      navigate(-1);
  };

  return (
    <nav>
      <div className="logo">
        <img src="https://syllabus.codeyourfuture.io/img/logo.png" alt="Your Logo" />
      </div>
      <ul className="nav-links">
        <li>
        <a href="/"> <button>Home</button> </a>
        </li>
        <li>
          <button onClick={handleEmailButtonClick}>Contact Support</button>
        </li>
        <li>
        <button className="back-button" onClick={goBack}>Back</button>
        </li>
      </ul>
    </nav>
  );
};

export default BackNav;