import React, { useState, useEffect } from "react";
import "./../css/NewTest.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
const axios = require("axios");

function ScorePage() {
  const [TID, setTeacherId] = useState(null);
  useEffect(() => {
    let TeacherID = sessionStorage.getItem("token_hr");
    setTeacherId(atob(atob(atob(TeacherID))));
  }, []);
  const init__formdata = {
    total: "0",
    score3: "0",
    score2: "0",
    score1: "0",
    emailId: "",
    jobId: "",
  };
  const [formdata, setFormdata] = new useState(init__formdata);
  const changeFormdata = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const setError = (text) => {
    let error = document.getElementById("error");
    error.innerHTML += text + "<br>";
    error.style.display = "block";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
    document.getElementById("submitButton").value = "SUBMIT";
  };

  const resetError = () => {
    let error = document.getElementById("error");
    error.innerText = "";
    error.style.display = "none";
  };

  const isError = () => {
    let error = document.getElementById("error");
    if (error.style.display === "none") {
      return false;
    }
    return true;
  };

  const setSuccess = (text) => {
    let success = document.getElementById("success");
    success.innerHTML = text;
    success.style.display = "block";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
    document.getElementById("submitButton").innerText = "SUBMIT";
  };

  const resetSuccess = () => {
    let success = document.getElementById("success");
    success.innerText = "";
    success.style.display = "none";
  };

  const resetAll = () => {
    setFormdata(init__formdata);
    resetError();
  };

  const cs = (score) => {
    if (score !== "" && parseInt(score) >= 0 && parseInt(score) <= 10) {
      return true;
    }
    return false;
  };

  const submitScore = async (e) => {
    resetError();
    if (formdata.jobId !== "") {
      if (formdata.emailId !== "" && formdata.emailId.includes("@")) {
        if (cs(formdata.score1) && cs(formdata.score2) && cs(formdata.score3)) {
          e.preventDefault();
          e.target.style.pointerEvents = "none";
          e.target.style.opacity = ".5";
          e.target.value = "Submitting...";
          let res = await axios.post("api/hr/score", {
            ...formdata,
            teacherId: TID,
          });
          let data = res.data;
          if (data.message === "notfound") {
            setError("Job Id not found!");
          } else if (data.message === "emailnotfound") {
            setError("Email Id not found!");
          } else if (data.message === "idk") {
            setError("Internal problem!");
          } else {
            document.getElementById("submitButton").value = "Submitted";
            resetAll();
            setSuccess("Score updated successfully!");
            setTimeout(function () {
              resetSuccess();
            }, 5000);
          }
          document.getElementById("submitButton").innerText = "Submit";
          document.getElementById("submitButton").style.pointerEvents = "unset";
          document.getElementById("submitButton").style.opacity = "1";
        } else {
          setError("Enter valid score!");
        }
      } else {
        setError("Enter Email ID!");
      }
    } else {
      setError("Enter Job Id!");
    }
  };

  return (
    <>
      <div className="ScorePage__ NewTest__">
        <div id="form" className="formNewTest">
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Job ID"
            type="text"
            name="jobId"
            value={formdata.jobId}
            onChange={changeFormdata}
          />
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Email/Name"
            type="text"
            name="emailId"
            value={formdata.emailId}
            onChange={changeFormdata}
          />
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Score-1"
            type="number"
            name="score1"
            InputProps={{
              max: 10,
              min: 0,
            }}
            value={formdata.score1}
            onChange={changeFormdata}
          />
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Score-2"
            type="number"
            name="score2"
            InputProps={{
              max: 10,
              min: 0,
            }}
            value={formdata.score2}
            onChange={changeFormdata}
          />
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Score-3"
            type="number"
            name="score3"
            InputProps={{
              max: 10,
              min: 0,
            }}
            value={formdata.score3}
            onChange={changeFormdata}
          />
          <TextField
            className="formNewTestMainDiv"
            variant="outlined"
            label="Total"
            type="number"
            name="total"
            value={formdata.total}
            onChange={changeFormdata}
          />
          <div id="error" style={{ display: "none" }}></div>
          <div id="success" style={{ display: "none" }}></div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="submitButton"
            id="submitButton"
            onClick={submitScore}
            startIcon={<CloudUploadIcon />}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default ScorePage;
