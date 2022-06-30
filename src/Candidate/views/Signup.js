import React, { useEffect, useState } from "react";
import "./../styles/Signin.scss";
import { addcl, remcl } from "../components/functions";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import EmailIcon from "@mui/icons-material/Email";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FlagIcon from "@mui/icons-material/Flag";
import { Link, useHistory } from "react-router-dom";
import { studentSignupAPI } from '../API/APIService'

const axios = require("axios");

export default function Signup() {
  const history = useHistory();
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addcl);
        input.removeEventListener("blur", remcl);
      });
    };
  }, []);
  // Add class on focus into input divs

  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const init__formdata = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    countryCode: "",
    mobileNumber: "",
    password: "",
  };
  const [formdata, setFormdata] = new useState(init__formdata);
  const changeFormdata = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkErrors = (e) => {
    e.target.value = "Loading...";
    e.target.setAttribute("disabled", "true");
    if (formdata.username === "" || formdata.username.length < 4) {
      setError("Username should not be less than 4 characters.");
    } else if (formdata.firstname === "" || formdata.firstname.length < 3) {
      setError("First name should not be less than 3 characters.");
    } else if (formdata.lastname === "" || formdata.lastname.length < 3) {
      setError("Last name should not be less than 3 characters.");
    } else if (formdata.mobileNumber === "" || formdata.countryCode === "") {
      setError("Mobile number and country code is must.");
    } else if (formdata.password === "" || formdata.password.length < 5) {
      setError("Password should not be less than 5 characters.");
    } else {
      setError("");
      signup(e);
    }
    e.target.value = "Sign Up";
    e.target.removeAttribute("disabled");
  };

  const signup = async (e) => {
    let toSend = formdata;
    if (toSend.countryCode[0] !== "+") {
      toSend = {
        ...toSend,
        countryCode: "+" + toSend.countryCode,
      };
    }
    let res = await axios.post(studentSignupAPI, toSend);
    let data = res.data;
    if (data.message) {
      setError("Account already exists, please login.");
    } else {
      e.target.value = "Signed Up...";
      if (data.email === "admin" || data.username === "admin") {
        sessionStorage.setItem("admin", btoa(btoa(btoa(data.id))));
        history.push("/adminArea");
      } else {
        sessionStorage.setItem("token", btoa(btoa(btoa(data.id))));
        // sessionStorage.setItem("student_id", res.data.data[0].id);
        history.push("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="Signup__">
        <img className="wave" src="/frontend/static/images/wave.png" />
        <div className="container">
          <div className="img">
            <img src="/frontend/static/images/desktopinterviewer.svg" />
          </div>
          <div className="login-content">
            <div className="form">
              <div className="input-div one">
                <div className="i">
                  <AlternateEmailIcon />
                </div>
                <div className="div">
                  <h5>Username</h5>
                  <input
                    type="text"
                    name="username"
                    value={formdata.username}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <Filter1Icon />
                </div>
                <div className="div">
                  <h5>First Name</h5>
                  <input
                    type="text"
                    name="firstname"
                    value={formdata.firstname}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <Filter2Icon />
                </div>
                <div className="div">
                  <h5>Last Name</h5>
                  <input
                    type="text"
                    name="lastname"
                    value={formdata.lastname}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <EmailIcon />
                </div>
                <div className="div">
                  <h5>Email</h5>
                  <input
                    type="text"
                    name="email"
                    value={formdata.email}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <FlagIcon />
                </div>
                <div className="div">
                  <h5>Country Code</h5>
                  <input
                    type="number"
                    name="countryCode"
                    value={formdata.countryCode}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <ContactPhoneIcon />
                </div>
                <div className="div">
                  <h5>Mobile Number</h5>
                  <input
                    type="number"
                    name="mobileNumber"
                    value={formdata.mobileNumber}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <VpnKeyIcon />
                </div>
                <div className="div">
                  <h5>Password</h5>
                  <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={changeFormdata}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <VpnKeyIcon />
                </div>
                <div className="div">
                  <h5>Confirm Password</h5>
                  <input
                    type="password"
                    name="cPassword"
                    value={confirmPass}
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                    className="input"
                  />
                </div>
              </div>
              <Link to="/signin">Already a Member? Sign In</Link>
              <span className="error">{error}</span>
              <input
                type="button"
                className="btn"
                value="Sign Up"
                onClick={checkErrors}
                disabled={
                  confirmPass === formdata.password &&
                  confirmPass !== "" &&
                  validateEmail(formdata.email)
                    ? false
                    : true
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
