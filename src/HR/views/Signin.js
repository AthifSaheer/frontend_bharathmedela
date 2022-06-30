import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./../css/Signup.scss";

import logo from "../Images/logo.png";
import waveImg from "../Images/wave.png";
import signImg from "../Images/SignIn Image.svg";
import avatarImg from "../Images/avatar.svg";

import { HRLoginAPI, HRForgotPassAPI } from "../API/APIService"

const axios = require("axios");

function Signin(props) {
  const history = useHistory();

  const [forgot, setForgot] = useState(false);
  const [fPhone, setFPhone] = useState("");

  const init__formdata = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = new useState(init__formdata);

  useEffect(() => {
    setFormdata({
      ...formdata,
      password: "",
    });
  }, [forgot]);

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

  const setError = (text, defaultButtonValue = "Sign In") => {
    let error = document.getElementById("error");
    error.innerHTML = text;
    error.style.display = "block";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
    document.getElementById("submitButton").value = defaultButtonValue;
  };

  const resetError = () => {
    let error = document.getElementById("error");
    error.innerText = "";
    error.style.display = "none";
  };

  const login = async () => {
    axios.post(HRLoginAPI, formdata).then((res) => {
      let data = res.data;
      // console.log("data.data[0].id--", data.data[0].id);
      
      if (data.message === "empty") {
        setError("Don`t trynna play with us!");
      } else if (data.message === "noaccount") {
        setError("No account found. Please sign up!");
      } else if (data.message === "wrongpassword") {
        setError("Wrong password!");
      } else if (data.message === "loggedin") {
        document.getElementById("submitButton").value = "Signed In";
        sessionStorage.setItem("token_hr", btoa(btoa(btoa(data.data[0].id))));
        history.push("/hr/dashboard");
      }
      document.getElementById("submitButton").value = "Sign In";
      document.getElementById("submitButton").style.pointerEvents = "unset";
      document.getElementById("submitButton").style.opacity = "1";
    })
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = ".5";
    e.target.value = "Resetting...";
    resetError();
    if (formdata.email !== "" && fPhone !== "") {
      if (validateEmail(formdata.email)) {
        if (formdata.password.length > 5 && formdata.password.length <= 50) {
          axios.post(HRForgotPassAPI, {
            email: formdata.email,
            password: formdata.password,
            phoneNumber: fPhone,
          }).then((res) => {
            let data = res.data;
            if (data.message === "empty") {
              setError("Don`t trynna play with us!");
            } else if (data.message === "noaccount") {
              setError("No account found. Please sign up!");
            } else if (data.message === "wrongpassword") {
              setError("Seems like it`s not you!");
            } else if (data.message === "loggedin") {
              document.getElementById("submitButton").value = "Resetted";
              sessionStorage.setItem("token_hr", btoa(btoa(btoa(data.data.id))));
              history.push("/hr/dashboard");
            }
            document.getElementById("submitButton").value = "Reset";
            document.getElementById("submitButton").style.pointerEvents = "unset";
            document.getElementById("submitButton").style.opacity = "1";
          })
        } else {
          setError("Password too short!");
        }
      } else {
        setError("Invalid email address!");
      }
    } else {
      setError("Fill all fields!");
    }
  };

  const submitFormdata = async (e) => {
    e.preventDefault();
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = ".5";
    e.target.value = "Signing In...";
    resetError();

    if (formdata.email !== "" && formdata.password !== "") {
      if (validateEmail(formdata.email)) {
        login();
      } else {
        setError("Invalid email address!");
      }
    } else {
      setError("Fill all fields!");
    }
  };
  return (
    <>
      <div className="Signin__">
        <header>
          <div className="container1">
            <input type="checkbox" name="" id="check" />

            <div className="logo-container">
              <Link to="/">
                <div className="image">
                  <img src={logo} />
                </div>
              </Link>
            </div>

            <div className="nav-btn">
              <div className="nav-links">
                <ul>
                  <li className="nav-link" style={{ "--i": ".6s" }}>
                    <Link to="#">Home</Link>
                  </li>
                  <li className="nav-link" style={{ "--i": ".85s" }}>
                    <Link to="#">
                      Menu<i className="fa fa-caret-down"></i>
                    </Link>
                    <div className="dropdown">
                      <ul>
                        <li className="dropdown-link">
                          <Link to="#">Link 1</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">Link 2</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">
                            Link 3<i className="fa fa-caret-down"></i>
                          </Link>
                          <div className="dropdown second">
                            <ul>
                              <li className="dropdown-link">
                                <Link to="#">Link 1</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">Link 2</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">Link 3</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">
                                  More<i className="fa fa-caret-down"></i>
                                </Link>
                                <div className="dropdown second">
                                  <ul>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 1</Link>
                                    </li>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 2</Link>
                                    </li>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 3</Link>
                                    </li>
                                    <div className="arrow"></div>
                                  </ul>
                                </div>
                              </li>
                              <div className="arrow"></div>
                            </ul>
                          </div>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">Link 4</Link>
                        </li>
                        <div className="arrow"></div>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-link" style={{ "--i": "1.1s" }}>
                    <Link to="#">
                      Subjects<i className="fa fa-caret-down"></i>
                    </Link>
                    <div className="dropdown">
                      <ul>
                        <li className="dropdown-link">
                          <Link to="#">Link 1</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">Link 2</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">
                            Link 3<i className="fa fa-caret-down"></i>
                          </Link>
                          <div className="dropdown second">
                            <ul>
                              <li className="dropdown-link">
                                <Link to="#">Link 1</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">Link 2</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">Link 3</Link>
                              </li>
                              <li className="dropdown-link">
                                <Link to="#">
                                  More<i className="fa fa-caret-down"></i>
                                </Link>
                                <div className="dropdown second">
                                  <ul>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 1</Link>
                                    </li>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 2</Link>
                                    </li>
                                    <li className="dropdown-link">
                                      <Link to="#">Link 3</Link>
                                    </li>
                                    <div className="arrow"></div>
                                  </ul>
                                </div>
                              </li>
                              <div className="arrow"></div>
                            </ul>
                          </div>
                        </li>
                        <li className="dropdown-link">
                          <Link to="#">Link 4</Link>
                        </li>
                        <div className="arrow"></div>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-link" style={{ "--i": "1.35s" }}>
                    <Link to="#">About</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hamburger-menu-container">
              <div className="hamburger-menu">
                <div></div>
              </div>
            </div>
          </div>
        </header>
        <img className="wave" src={waveImg} />
        <div className="container">
          <div className="img">
            <img src={signImg} />
          </div>
          <div className="login-content">
            {forgot === false ? (
              <>
                <div>
                  <img src={avatarImg} />
                  <p id="error" style={{ display: "none" }}></p>
                  <h2 className="title">Welcome!</h2>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fa fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        placeholder="Email ID"
                        className="input"
                        name="email"
                        onChange={changeFormdata}
                        value={formdata.email}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fa fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        name="password"
                        onChange={changeFormdata}
                        value={formdata.password}
                      />
                    </div>
                  </div>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setForgot(true);
                    }}
                    className="forgotPass"
                  >
                    Forgot Password?
                  </a>
                  <input
                    type="button"
                    onClick={submitFormdata}
                    className="btn"
                    value="Sign In"
                    id="submitButton"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <img src={avatarImg} />
                  <p id="error" style={{ display: "none" }}></p>
                  <h2 className="title">Reset Password!</h2>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fa fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        placeholder="Email ID"
                        className="input"
                        name="email"
                        onChange={changeFormdata}
                        value={formdata.email}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fa fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="number"
                        placeholder="Phone Number"
                        className="input"
                        name="phone"
                        onChange={(e) => {
                          setFPhone(e.target.value);
                        }}
                        value={fPhone}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fa fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        placeholder="New Password"
                        className="input"
                        name="password"
                        onChange={changeFormdata}
                        value={formdata.password}
                      />
                    </div>
                  </div>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setForgot(false);
                    }}
                    className="forgotPass"
                  >
                    Back to Signin?
                  </a>
                  <input
                    type="button"
                    onClick={forgotPassword}
                    className="btn"
                    value="Reset"
                    id="submitButton"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
