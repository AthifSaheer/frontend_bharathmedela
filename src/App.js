import React, { useState } from "react";
import Signin from "./Candidate/views/Signin";
import Signup from "./Candidate/views/Signup";
import Dashboard from "./Candidate/views/Dashboard";
import Admin from "./Candidate/views/Admin";
import MCQTest from "./Candidate/views/MCQTest";
import TalkToTeacher from "./Candidate/views/TalkToTeacher";
import Sidebar from "./Candidate/components/Sidebar";
import Resume from "./Candidate/views/Resume/Resume";
import AddResume from "./Candidate/views/Resume/AddResume";
// import AddExperience from "./Resume/AddExperience";

import HRSignin from "./HR/views/Signin";
import HRSignup from "./HR/views/Signup";
import HRDashboard from "./HR/views/Dashboard";
import HRNewTest from "./HR/views/NewTest";
import HRCodingTest from "./HR/views/CodingTest";
import HRScorePage from "./HR/views/ScorePage";
import HRAnalytics from "./HR/views/Analytics";
import HRSidebar from "./HR/components/Sidebar";
import HRCandidateFinder from "./HR/views/CandidateFinder"

import {BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "./Candidate/styles/App.scss";

// function to guard the component for private access
const authGuard = (Component) => () => {
  return sessionStorage.getItem("token") ? (
    <Sidebar>
      <Component />
    </Sidebar>
  ) : (
    <Redirect to="/signin" />
  );
};

// function to guard the login/signup for logged in access
const authGuardGates = (Component) => () => {
  return sessionStorage.getItem("token") ? (
    <Redirect to="/dashboard" />
  ) : sessionStorage.getItem("admin") ? (
    <Redirect to="/adminArea" />
  ) : (
    <Component />
  );
};

// Admin

// function to guard the component for private access
const authGuardAdmin = (Component) => () => {
  return sessionStorage.getItem("admin") ? (
    <Component />
  ) : (
    <Redirect to="/signin" />
  );
};



// function to guard the component for private access
const hrAuthGuard = (Component, Name) => () => {
    return sessionStorage.getItem("token_hr") ? (
        <HRSidebar name={Name}>
        <Component />
        </HRSidebar>
    ) : (
        <Redirect to="/hr/signin" />
    );
};

    // function to guard the login/signup for logged in access
const hrAuthGuardGates = (Component) => () => {
    return sessionStorage.getItem("token_hr") ? (
        <Redirect to="/hr/dashboard" />
    ) : (
        <Component />
    );
};

function App(props) {
  return (
    <>
      <Router>
        <Switch>
        {/* Candidate */}
          <Route exact path="/" component={authGuardGates(Signin)} />
          <Route path="/signin" component={authGuardGates(Signin)} />
          <Route path="/signup" component={authGuardGates(Signup)} />
          <Route path="/dashboard" render={authGuard(Dashboard, "Dashboard")} />
          <Route path="/mcqTest" render={authGuard(MCQTest, "MCQ Test")} />
          <Route
            path="/talkToTeacher"
            render={authGuard(TalkToTeacher, "Talk To Teacher")}
          />
          <Route path="/adminArea" render={authGuardAdmin(Admin, "Admin")} />

          <Route path="/resume" component={Resume} />
          <Route path="/add/resume/details" component={AddResume} />
          {/* <Route path="/add/resume/experience" component={AddExperience} /> */}

        {/* HR */}
          <Route path="/hr/signin" component={hrAuthGuardGates(HRSignin)} />
          <Route path="/hr/signup" component={hrAuthGuardGates(HRSignup)} />
          <Route path="/hr/dashboard" render={hrAuthGuard(HRDashboard, "Dashboard")} />
          <Route path="/hr/test" render={hrAuthGuard(HRNewTest, "New Test")} />
          <Route
            path="/hr/codingTest"
            render={hrAuthGuard(HRCodingTest, "Coding Test")}
          />
          <Route
            path="/hr/enterScores"
            render={hrAuthGuard(HRScorePage, "Enter Scores")}
          />
          <Route path="/hr/analytics" render={hrAuthGuard(HRAnalytics, "Analytics")} />
          <Route path="/hr/candidate/finder" render={hrAuthGuard(HRCandidateFinder, "HRCandidateFinder")} />
          

          <Route path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
