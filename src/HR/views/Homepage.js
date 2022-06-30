import React from "react";
import { Link } from "react-router-dom";
import "./../css/Homepage.scss";

function Homepage(props) {
  return (
    <div id="Homepage">
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  );
}

export default Homepage;
