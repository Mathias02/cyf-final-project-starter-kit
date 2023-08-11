<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TraineeTracker.css";

const TraineeTracker = ({ name }) => {

    // Existing PRs and other states
    const [prs, setPrs] = useState(0);
    const [show, setShow] = useState(false);
    const [codeWarsRank, setCodeWarsRank] = useState(0);

    // Cohort state
    const [cohort, setCohort] = useState(null);

    // Fetch PRs from GitHub API
    useEffect(() => {
      fetch(`https://api.github.com/search/issues?q=is:pr%20author:${name}%20user:codeyourfuture`)
        .then((res) => res.json())
        .then((data) => {
          setPrs(data);
        });
    }, [name]);

    // Fetch cohort information from server
    useEffect(() => {
      fetch(`/cohorts/github/${name}`)
        .then((res) => res.json())
        .then((data) => setCohort(data))
        .catch((err) => console.error(err));
    }, [name]);

    return(
      <div className="traineeD">
        <Navbar />
        <h1>Hello trainee, below is your tracked total score</h1>

        {/* Cohort Information */}
        {
          cohort && (
            <div className="cohort-info">
              <h2>Cohort Information:</h2>
              <p>Name: {cohort.name}</p>
              {/* Add other cohort details here */}
            </div>
          )
        }

        {/* Existing Table to Display Data */}
        <div className='tablescore'>
          <table>
            <thead>
              <tr>
                <th>PRs</th>
                <th>CodeWars</th>
                <th>Codility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{show ? prs.total_count: 0}</td>
                <td>{codeWarsRank}</td> {/* Assuming you fetch this information somewhere */}
                <td>52</td>
              </tr>
            </tbody>
          </table>
=======

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
        .then(data => setEntry(data))
    },[user]);

    useEffect(() =>{
        fetch(`https://www.codewars.com/api/v1/users/${user}`)
        .then(res => res.json())
        .then(data => setCodewars(data))
    },[user])


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
>>>>>>> main
        </div>

     <Footer />
      </div>
    );
};

<<<<<<< HEAD
export default TraineeTracker;
=======
export default TraineeTracker;
>>>>>>> main
