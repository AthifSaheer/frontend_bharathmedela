import React from "react";

const SessionData = React.createContext({
  TDATA: {
    id: 0,
    plan: "",
    email: "",
    schoolName: "",
    mobileNumber: "",
    password: "",
    credits: 0,
    signedUpAt: "",
  },
  setTDATA: () => {},
});

export default SessionData;
