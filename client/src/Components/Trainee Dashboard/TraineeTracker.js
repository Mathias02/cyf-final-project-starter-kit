import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeTracker.css';

const TraineeTracker = () => {


    useEffect(() =>{
        fetch('https://api.github.com/search/issues?q=is:pr%20author:Mathias02%20user:codeyourfuture')
        .then(res => console.log(res.json()))
    },[]);

    return(
        <div className='tracker'>
        <Navbar />
            <h1>Hello trainee, below is your tracked score</h1>
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
                            <td>21</td>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <Footer />
        </div>
    )
}

export default TraineeTracker;