import React from "react";

const SessionData = React.createContext({
  TDATA: {
    id: 0,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    password: "",
    credits: 0,
    signedUpAt: "",
  },
  setTDATA: () => {},
});

export default SessionData;
