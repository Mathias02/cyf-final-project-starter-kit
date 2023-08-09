import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import TraineeTracker from '../Trainee Dashboard/TraineeTracker';

const TraineeLogin = () => {
  const [username, setUsername] = useState('');
  const [show, setShow] = useState(false);

const userInput = (e) =>{
   e.preventDefault();
   console.log(username);
}

if(show) {
  return(
    <TraineeTracker  />
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
            <form className="myform">
              <input type="text" id='userdetails' value={username} className='user'  name='userdetails' placeholder='Github username' onChange={e => setUsername(e.target.value)} required/>
              <input type="submit" className='btn-submit' value="submit" onClick={() => setShow(!show)} />
            </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TraineeLogin;
