
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect} from 'react';
import TraineeTracker from '../Trainee Dashboard/TraineeTracker';

const TraineeLogin = () => {
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});


const inputSubmit = (e) =>{
    e.preventDefault()
    setShow(true)
    setUsername(username)
}

if(show) {
  return(
    <TraineeTracker  user={username}/>
  ) 
}

  return (
    <div>
      <Navbar />
      <div className='trainee-login-container'>
        <div className="sign">
            <div className="github">
              <i className="fab fa-github"></i> {/* GitHub icon */}
                <span>Sign in with GitHub</span>
            </div>
            <form className="user_name" onSubmit={inputSubmit}>
                <input type="text" name='user' value={username} onChange={(e) =>setUsername(e.target.value)} className='user' placeholder='GitHub username' required />
                <input type="submit" className='btn-submit' value="submit" />
            </form>   
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TraineeLogin;
