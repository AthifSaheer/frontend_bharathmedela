import React, { useState, useEffect } from 'react'
import AddResume from './AddResume'
import './Resume.css'
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { getResumeDetailsAPI } from '../../API/APIService'
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Resume() {
  let StudentID = sessionStorage.getItem("token");
  let decoded_id = atob(atob(atob(StudentID)));

  const [showRsmDetails, setShowRsmDetails] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  var list = []
  useEffect(() => {
    axios.get(`${getResumeDetailsAPI}/${decoded_id}`)
    .then((res) => {
      console.log("Success ----- !!", res.data);
      if(res.data["Message"]) {
        setError(res.data['Message'])
        setShowRsmDetails(false);
      } else {
        setShowRsmDetails(true);
        list.push(res.data)
        setData(list)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <div className="resume-main-div">
        {showRsmDetails? 
            data.map((data, index) => (
              <>
                <div className="rlmd-details-div-1"></div>
                <div className="rlmd-details-div" key={data.id}>

                  <div className="text-algn-centr">
                    <h1 style={{color: "#38d39f"}}>Personal details</h1>
                    <p style={{ color: 'red' }}>{error}</p>
                  </div>

                  <p><strong>First Name:</strong> { data.first_name }</p>
                  <p><strong>Last Name:</strong> { data.last_name }</p>
                  <p><strong>Profile Title:</strong> { data.profile_text }</p>
                  <p><strong>Email:</strong> { data.email }</p>
                  <p><strong>Gender:</strong> { data.gender }</p>
                  <p><strong>LinkedIn link:</strong> { data.linkedin_link }</p>
                  <p><strong>Phone Number:</strong> { data.ph }</p>
                  <p><strong>Skills:</strong> { data.skills }</p>
                  <p><strong>Education:</strong> { data.education }</p>
                  <p><strong>Experience:</strong> { data.experience }</p>
                  <p><strong>Current Location:</strong> { data.current_location }</p>
                  <p><strong>Country:</strong> { data.country }</p>
                  <p><strong>Preferred locations:</strong> { data.preferred_location }</p>
                  {/* <p><strong>Resume:</strong> { data.resume }</p> */}
                  <p><strong>Looking for a Job :</strong> { data.looking_for_a_job? "Yes" : "No" }</p>
                  
                  <div className="text-algn-centr">
                    <button className="rcrud-button">EDIT</button>
                  </div>

                </div>
              </>
            ))
        :
          <Link to="/add/resume/details">
            <button className="rcrud-button">ADD</button>
          </Link>
        }
    </div>
  )
}

export default Resume