import React from "react";
import "./../styles/Dashboard.scss";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function Navbar(props) {
  const history = useHistory();
  const logout = () => {
    sessionStorage.clear();
    history.push("/signin");
  };
  
  return (
    <div className="__Navbar">
      <span className="buttonWrapper">
        <Link to="/mcqTest" className="white">
          Take MCQ Test
        </Link>
        <Link to="/talkToTeacher" className="white">
          Talk To Teacher
        </Link>
        <Link to="#" className="white">
          Learn Something New
        </Link>
        <Link to="/resume" className="white">
          Resume
        </Link>
      </span>
      <span className="info">
        <div className="creditsGroup">
          <span className="attr">Credits: </span>
          <span className="value">{props.data.credits}</span>
        </div>
        <Avatar
          // sx={{ bgcolor: deepOrange[500] }}
          alt={`${props.data.firstname} ${props.data.lastname}`}
          src=""
          className="avatar"
        />
        <button className="white" onClick={logout}>
          Logout
        </button>
      </span>
    </div>
  );
}
