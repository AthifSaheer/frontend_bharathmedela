import React, { useState } from "react";
import Homepage from "./Homepage";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import NewTest from "./NewTest";
import CodingTest from "./CodingTest";
import ScorePage from "./ScorePage";
import Analytics from "./Analytics";
import Sidebar from "./../components/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./../css/App.scss";

// function to guard the component for private access
const hrAuthGuard = (Component, Name) => () => {
  return sessionStorage.getItem("token") ? (
    <Sidebar name={Name}>
      <Component />
    </Sidebar>
  ) : (
    <Redirect to="/hr/signin" />
  );
};

// function to guard the login/signup for logged in access
const hrAuthGuardGates = (Component) => () => {
  return sessionStorage.getItem("token") ? (
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
          <Route exact path="/hr" component={hrAuthGuardGates(Signin)} />
          <Route path="/hr/signin" component={hrAuthGuardGates(Signin)} />
          <Route path="/hr/signup" component={hrAuthGuardGates(Signup)} />
          <Route path="/hr/dashboard" render={hrAuthGuard(Dashboard, "Dashboard")} />
          <Route path="/hr/test" render={hrAuthGuard(NewTest, "New Test")} />
          <Route
            path="/hr/codingTest"
            render={hrAuthGuard(CodingTest, "Coding Test")}
          />
          <Route
            path="/hr/enterScores"
            render={hrAuthGuard(ScorePage, "Enter Scores")}
          />
          <Route path="/hr/analytics" render={hrAuthGuard(Analytics, "Analytics")} />
          <Route path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
