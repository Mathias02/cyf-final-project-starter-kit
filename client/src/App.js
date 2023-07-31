
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home Page/Home';
import TraineeLogin from './Components/Login/TraineeLogin';
import AdminLogin from './Components/Login/AdminLogin';
import TraineeTracker from './Components/Trainee Dashboard/TraineeTracker'

const App = () => {
  return (
      <div>
        {/* Navbar or any other components can be included here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainee-login" element={<TraineeLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/trainee-tracker" element={<TraineeTracker />} />
        </Routes>
      </div>
  );
};

export default App;



