import React, { useState, useEffect } from "react";
import "./../styles/Sidebar.scss";
import { Link, useHistory } from "react-router-dom";
import SessionData from "./SessionData";
import axios from "axios";
import { studentDetailsAPI } from '../API/APIService'

export default function Sidebar(props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [TDATA, setTDATA] = useState({
    id: 0,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    password: "",
    credits: 0,
    signedUpAt: "",
  });

  useEffect(() => {
    let StudentID = sessionStorage.getItem("token");
    let decoded_id = atob(atob(atob(StudentID)));
    axios.get(`${studentDetailsAPI}/${decoded_id}`)
    .then((res) => {
      setTDATA(res.data);
    })
  }, [])

  const value = { TDATA, setTDATA };
  const logout = () => {
    sessionStorage.clear();
    history.push("/signin");
  };

  return (
    <SessionData.Provider value={value}>
    <div className={`l-navbar ${open ? "expander" : ""}`} id="navbar">
      <nav className="nav">
        <div>
          <div className="nav__brand">
            <button
              className={`grid-list-button ${open ? "animation list" : ""}`}
              id="nav-toggle"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span className="icon">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </button>
            <Link to="/" className={`nav__logo ${open ? "show" : ""}`}>
              SIM
            </Link>
          </div>
          <div className="nav__list">
            <Link to="/" className="nav__link active">
              <ion-icon name="compass-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>
                Dashboard
              </span>
            </Link>
            <Link to="/" className="nav__link">
              <ion-icon name="document-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>Profile</span>
            </Link>
            <Link to="/" className="nav__link">
              <ion-icon name="analytics-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>
                Analytics
              </span>
            </Link>
            <Link to="/" className="nav__link">
              <ion-icon name="book-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>Blog</span>
            </Link>
            <Link to="/" className="nav__link">
              <ion-icon name="settings-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>
                Settings
              </span>
            </Link>
            <a
              onClick={logout}
              style={{ cursor: "pointer" }}
              className="nav__link"
            >
              <ion-icon name="log-out-outline" className="nav__icon" />
              <span className={`nav__name ${open ? "show" : ""}`}>Logout</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
    {props.children}
    </SessionData.Provider>
  );
}
