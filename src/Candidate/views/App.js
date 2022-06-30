import React, { useState } from "react";
// import Homepage from "./Homepage";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import MCQTest from "./MCQTest";
import TalkToTeacher from "./TalkToTeacher";
import Sidebar from "../components/Sidebar";
import Resume from "./Resume/Resume";
import AddResume from "./Resume/AddResume";
import AddExperience from "./Resume/AddExperience";

// import NewTest from "./NewTest";
// import CodingTest from "./CodingTest";
// import ScorePage from "./ScorePage";
// import Analytics from "./Analytics";
// import Sidebar from "./../components/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./../styles/App.scss";

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

function App(props) {
  return (
    <>
      <Router>
        <Switch>
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
          <Route path="/add/resume/experience" component={AddExperience} />

          <Route path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
