import React, { useEffect, useState } from "react";
import "./../styles/Signin.scss";
import { addcl, remcl } from "../components/functions";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Link, useHistory } from "react-router-dom";
import { studentLoginAPI } from '../API/APIService'

// import logo from "../Images/logo.png";
import waveImg from "../Images/wave.png";
import signImg from "../Images/SignIn Image.svg";
import avatarImg from "../Images/avatar.svg";

const axios = require("axios");

export default function Signin() {
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

  const [error, setError] = useState("");
  const init__formdata = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = new useState(init__formdata);
  const changeFormdata = (e) => {
    setError("");
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
    if (validateEmail(formdata.email)) {
      signin(formdata, e);
    } else {
      signin(
        {
          username: formdata.email,
          password: formdata.password,
        },
        e
      );
    }
    e.target.value = "Sign In";
    e.target.removeAttribute("disabled");
  };

  // function ownsg() {
  //   console.log("worked!");
  //   axios.post(studentLoginAPI, {"email": "saam@gmail.com", "password": "12345"})
  //   .then((res) => {
  //     console.log("Success ----- !!", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const signin = async (toSend, e) => {
    let res = await axios.post(studentLoginAPI, toSend);
    let data = res.data;
    if (data.message === "wrongpassword") {
      setError("Incorrect password.");
    } else if (data.message === "noaccount") {
      setError("No account exists, please signup.");
    } else {
      e.target.value = "Signed In...";
      if (data.data[0].email === "admin" || data.data[0].username === "admin") {
        sessionStorage.setItem("admin", btoa(btoa(btoa(data.data[0].id))));
        history.push("/adminArea");
      } else {
        sessionStorage.setItem("token", btoa(btoa(btoa(data.data[0].id))));
        // sessionStorage.setItem("student_id", res.data.data[0].id);
        history.push("/dashboard");
      }
    }
  };

  // Forgot Password

  const [forgot, setForgot] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (forgot && !!document.getElementById("newPassword")) {
      document.getElementById("newPassword").addEventListener("focus", addcl);
      document.getElementById("newPassword").addEventListener("blur", remcl);
      return () => {
        document
          .getElementById("newPassword")
          .removeEventListener("focus", addcl);
        document
          .getElementById("newPassword")
          .removeEventListener("blur", remcl);
      };
    }
  }, [forgot]);

  const reset = (e) => {
    e.target.value = "Loading...";
    e.target.setAttribute("disabled", "true");
    if (validateEmail(formdata.email)) {
      sendResetRequest(
        {
          ...formdata,
          mobileNumber: mobileNumber,
        },
        e
      );
    } else {
      sendResetRequest(
        {
          username: formdata.email,
          password: formdata.password,
          mobileNumber: mobileNumber,
        },
        e
      );
    }
    e.target.value = "Reset";
    e.target.removeAttribute("disabled");
  };

  const sendResetRequest = async (toSend, e) => {
    let res = await axios.post("api/students/forgot", toSend);
    let data = res.data;
    if (data.message === "wrongpassword") {
      setError("Incorrect mobile number.");
    } else if (data.message === "noaccount") {
      setError("No account exists, please signup.");
    } else {
      e.target.value = "Password Changed";
      if (data.data.email === "admin" || data.data.username === "admin") {
        sessionStorage.setItem("admin", btoa(btoa(btoa(data.data.id))));
        history.push("/adminArea");
      } else {
        sessionStorage.setItem("token", btoa(btoa(btoa(data.data.id))));
        history.push("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="Signin__">
        <img className="wave" src={waveImg} />
        <div className="container">
          <div className="img">
            <img src={signImg} />
          </div>
          <div className="login-content">
            <div className={`form ${forgot ? "hide" : "show"}`}>
              <img src={avatarImg} />
              <h2 className="title">Welcome Back!</h2>
              <div className="input-div one">
                <div className="i">
                  <AlternateEmailIcon />
                </div>
                <div className="div">
                  <h5>Username or Email</h5>
                  <input
                    type="text"
                    value={formdata.email}
                    onChange={changeFormdata}
                    name="email"
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
                    value={formdata.password}
                    onChange={changeFormdata}
                    name="password"
                    className="input"
                  />
                </div>
              </div>
              <span className="inARow">
                <Link to="/signup">Create a Account?</Link>
                <a
                  href={null}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setForgot(true);
                  }}
                >
                  Forgot Password?
                </a>
              </span>
              <span className="error">{error}</span>
              <input
                type="button"
                className="btn"
                value="Sign In"
                onClick={checkErrors}
                disabled={
                  formdata.password !== "" && formdata.email !== ""
                    ? false
                    : true
                }
              />
            </div>
            <div className={`form ${!forgot ? "hide" : "show"}`}>
              <img src={avatarImg} />
              <h2 className="title">Reset Password!</h2>
              <div className="input-div one">
                <div className="i">
                  <AlternateEmailIcon />
                </div>
                <div className="div">
                  <h5>Username or Email</h5>
                  <input
                    type="text"
                    value={formdata.email}
                    onChange={changeFormdata}
                    name="email"
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
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div pass" id="newPassword">
                <div className="i">
                  <VpnKeyIcon />
                </div>
                <div className="div">
                  <h5>New Password</h5>
                  <input
                    type="password"
                    value={formdata.password}
                    onChange={changeFormdata}
                    name="password"
                    className="input"
                  />
                </div>
              </div>
              <a
                href={null}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setForgot(false);
                }}
              >
                Back to Sign In?
              </a>
              <span className="error">{error}</span>
              <input
                type="button"
                className="btn"
                value="Reset"
                onClick={reset}
                disabled={
                  formdata.password !== "" &&
                  formdata.email !== "" &&
                  mobileNumber !== ""
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
