import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./../css/Signup.scss";
import "./../css/Plan.scss";

const axios = require("axios");

function Signup(props) {
  const history = useHistory();

  const [plan, setPlan] = new useState("");

  const choosePlan = (e) => {
    let planName = e.target.getAttribute("data-plan");
    setPlan(planName);
  };

  const init__formdata = {
    email: "",
    schoolName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
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

  const setError = (text) => {
    let error = document.getElementById("error");
    error.innerText = text;
    error.style.display = "block";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
    document.getElementById("submitButton").value = "Sign Up";
  };

  const resetError = () => {
    let error = document.getElementById("error");
    error.innerText = "";
    error.style.display = "none";
  };

  const addUser = async () => {
    let credits;
    if (plan === "basic") {
      credits = 50;
    } else if (plan === "advanced") {
      credits = 90;
    } else if (plan === "professional") {
      credits = 100;
    }
    let toSend = {
      plan: plan,
      email: formdata.email,
      schoolName: formdata.schoolName,
      mobileNumber: formdata.mobileNumber,
      password: formdata.password,
      credits: credits,
    };
    let res = await axios.post("api/users", toSend);
    let data = res.data;
    if (data.message) {
      setError("You have already signed up!");
    } else {
      document.getElementById("submitButton").value = "Signed Up";
      sessionStorage.setItem("token", btoa(btoa(btoa(data.id))));
      history.push("/dashboard");
    }
    document.getElementById("submitButton").value = "Sign Up";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
  };

  const submitFormdata = async (e) => {
    e.preventDefault();
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = ".5";
    e.target.value = "Signing Up...";
    resetError();

    if (
      formdata.email !== "" &&
      formdata.schoolName !== "" &&
      formdata.mobileNumber !== "" &&
      formdata.password !== "" &&
      formdata.confirmPassword !== ""
    ) {
      if (validateEmail(formdata.email)) {
        if (formdata.password.length > 5 && formdata.password.length <= 50) {
          if (formdata.password === formdata.confirmPassword) {
            // ok
            addUser();
          } else {
            setError("Password and confirm password should match!");
          }
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

  return (
    <>
      {plan === "" ? (
        <>
          <div className="Plan__">
            <div className="wrapper">
              <div className="heading">
                <h1>Choose Plan</h1>
              </div>

              <div className="plans">
                <div className="planbox">
                  <div className="icon txtcenter">
                    <img src="/frontend/static/images/java logo.png" />
                  </div>

                  <div className="content">
                    <h1 className="title">Basic</h1>
                    <h1 className="price">
                      $5 <span>/month</span>
                    </h1>
                    <p>Pay as you go</p>
                    <button data-plan="basic" onClick={choosePlan}>
                      Get Started
                    </button>
                  </div>
                </div>

                <div className="planbox">
                  <div className="icon txtcenter">
                    <img src="/frontend/static/images/java logo.png" />
                  </div>

                  <div className="content">
                    <h1 className="title">Advanced</h1>
                    <h1 className="price">
                      $15 <span>/account</span>
                    </h1>
                    <p>Test 200 students for free and pay for extra tests.</p>
                    <button data-plan="advanced" onClick={choosePlan}>
                      Get Started
                    </button>
                  </div>
                </div>

                <div className="planbox">
                  <div className="icon txtcenter">
                    <img src="/frontend/static/images/avatar.svg" />
                  </div>

                  <div className="content">
                    <h1 className="title">Professional</h1>
                    <h1 className="price">
                      $25 <span>/account</span>
                    </h1>
                    <p>Test 500 students for free and pay for extra tests.</p>
                    <button data-plan="professional" onClick={choosePlan}>
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="Signup__">
            <header>
              <div className="container1">
                <input type="checkbox" name="" id="check" />

                <div className="logo-container">
                  <Link to="/">
                    <div className="image">
                      <img src="/frontend/static/images/logo.png" />
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
            <img className="wave" src="/frontend/static/images/wave.png" />
            <div className="container">
              <div className="img">
                <img src="/frontend/static/images/signup_image.svg" />
              </div>
              <div className="login-content">
                <div id="form">
                  <img src="/frontend/static/images/avatar.svg" />
                  <p>
                    Plan :{" "}
                    <p
                      style={{
                        color: "#32be8f",
                        display: "inline-block",
                        marginBottom: "5px",
                      }}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </p>
                  </p>
                  <p id="error" style={{ display: "none" }}></p>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fa fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        className="input"
                        name="email"
                        placeholder="Email ID"
                        onChange={changeFormdata}
                        value={formdata.email}
                      />
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fa fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        className="input"
                        placeholder="School Name"
                        name="schoolName"
                        onChange={changeFormdata}
                        value={formdata.schoolName}
                      />
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fa fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        placeholder="Mobile Number"
                        type="number"
                        className="input"
                        name="mobileNumber"
                        onChange={changeFormdata}
                        value={formdata.mobileNumber}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fa fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        placeholder="Password"
                        type="password"
                        className="input"
                        name="password"
                        id="password"
                        onChange={changeFormdata}
                        value={formdata.password}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fa fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        placeholder="Confirm Password"
                        type="password"
                        className="input"
                        name="confirmPassword"
                        onChange={changeFormdata}
                        value={formdata.confirmPassword}
                      />
                    </div>
                  </div>
                  <Link to="/signin">Already a Member? Sign In</Link>
                  <input
                    type="button"
                    className="btn"
                    value="Sign Up"
                    onClick={submitFormdata}
                    id="submitButton"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
