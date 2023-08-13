import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeTracker.css';

const TraineeTracker = ({user}) => {

const [entry, setEntry] = useState([]);
const [codewars, setCodewars] = useState([]);

    useEffect(() =>{
        fetch(`https://api.github.com/search/issues?q=is:pr%20author:${user}%20user:codeyourfuture`)
        .then(res => {
            if(res.status == 200){
               return res.json()
            }else{
                console.log('wrong username')
            }
            })
        .then(data => setEntry(data)
      },[user]);

    useEffect(() =>{
        fetch(`https://www.codewars.com/api/v1/users/${user}`)
        .then(res => res.json())
        .then(data => setCodewars(data))
    },[user]);

    useEffect(() => {
        fetch(`/api/trainees?github_name=${user}`)
          .then(res => res.json())
          .then(data => {
            if (data.length > 0 && data[0].cohort) {
              setCohort(data[0].cohort);
            } else {
              console.log('No cohort data found for this user.');
            }
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching cohort data:', err);
            setError(err.message || 'An error occurred while fetching cohort data.');
            setLoading(false);
          });
      }, [user]);
    
    return(
        <div className='tracker'>
        <Navbar />
            <h1>Hello {user}, below is your tracked score</h1>
            <div className='tabcontainer'>
                <table className='tab'>
                    <thead>
                        <tr>
                            <th>PRs</th>
                            <th>CodeWars</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{entry?.total_count || 'Loading...'}</td>
                            <td>{codewars?.honor || 'Loading...'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <Footer />
        </div>
    );
};

export default TraineeTracker;