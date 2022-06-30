import React, { useState, useEffect } from "react";
import "./../css/NewTest.scss";
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SessionData from "./../components/SessionData";
const axios = require("axios");

function CodingQuestionsComponent(props) {
  return (
    <>
      <div className="codingQuestions">
        {props.codingQuestions.map((data, index) => {
          return (
            <div key={index} className="ownQuestionsOne">
              <TextField
                className="formNewTestMainDiv"
                variant="outlined"
                label={`Question ${index + 1}`}
                type="text"
                name="question"
                onChange={(e) => {
                  props.changeCodingQuestions(index, e);
                }}
                value={data.question}
              />
              <TextField
                className="formNewTestMainDiv"
                variant="outlined"
                label={`Expected Output ${index + 1}`}
                type="text"
                name="answer"
                onChange={(e) => {
                  props.changeCodingQuestions(index, e);
                }}
                value={data.answer}
              />
            </div>
          );
        })}
      </div>
      <FormControl variant="outlined" className="formNewTestMainDiv">
        <InputLabel>Time</InputLabel>
        <Select
          value={props.formdata.codingQuestionsTime}
          name="codingQuestionsTime"
          onChange={props.changeFormdata}
          label="Time"
        >
          <MenuItem value={30}>30 Minutes</MenuItem>
          <MenuItem value={60}>1 Hour</MenuItem>
          <MenuItem value={90}>1.5 Hour</MenuItem>
          <MenuItem value={120}>2 Hour</MenuItem>
          <MenuItem value={150}>2.5 Hour</MenuItem>
          <MenuItem value={180}>3 Hour</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className="addNewQuestionButton"
        startIcon={<AddBoxIcon />}
        onClick={props.addCodingQuestion}
      >
        Add Question
      </Button>
    </>
  );
}

function CodingTest() {
  const { TDATA, setTDATA } = React.useContext(SessionData);
  const [TID, setTeacherId] = useState(null);
  useEffect(() => {
    let TeacherID = sessionStorage.getItem("token_hr");
    setTeacherId(atob(atob(atob(TeacherID))));
  }, []);
  const init__formdata = {
    jobName: "",
    jobId: "",
    emailIds: "",
    codingQuestionsTime: "",
    testCloseDate: "",
    testCloseTime: "",
    chooseTopic: "",
    chooseSubTopic: "",
    numberOfQuestions: "",
    difficultyLevel: "",
    questions: "",
    codingQuestions: "",
    MCQQuestions: "",
    type: "codingTest",
  };
  const [formdata, setFormdata] = new useState(init__formdata);
  const changeFormdata = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  // Coding Questions

  const init__codingQuestions = [
    {
      question: "",
      answer: "",
    },
    {
      question: "",
      answer: "",
    },
  ];
  const [codingQuestions, setCodingQuestions] = new useState(
    init__codingQuestions
  );

  const changeCodingQuestions = (index, e) => {
    let values = [...codingQuestions];
    values[index][e.target.name] = e.target.value;
    setCodingQuestions(values);
  };

  const addCodingQuestion = () => {
    setCodingQuestions([
      ...codingQuestions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const prepareData = () => {
    let finalData = formdata;
    if (formdata.jobName !== "") {
      if (formdata.jobId !== "") {
        if (formdata.emailIds !== "") {
          if (formdata.testCloseDate !== "") {
            if (formdata.testCloseTime !== "") {
              let questionsCoding = [];
              if (!isError()) {
                if (formdata.codingQuestionsTime !== "") {
                  codingQuestions.map((T, key) => {
                    if (T.question !== "" && T.answer === "") {
                      setError(
                        "Enter Answer for Coding Question #" + (key + 1)
                      );
                    } else if (T.question === "" && T.answer !== "") {
                      setError(
                        "Enter Question for Coding Answer #" + (key + 1)
                      );
                    } else if (T.question !== "" && T.answer !== "") {
                      questionsCoding.push({
                        question: T.question,
                        answer: T.answer,
                      });
                    }
                  });
                  if (questionsCoding.length === 0) {
                    setError("Enter Coding Questions!");
                  }

                  if (!isError()) {
                    setFormdata({
                      ...formdata,
                      codingQuestions: questionsCoding,
                    });
                  }
                } else {
                  setError("Enter Time for Coding Test!");
                }
                if (!isError()) {
                  finalData.codingQuestions = questionsCoding;
                  return finalData;
                }
              }
            } else {
              setError("Enter Test Close Time!");
            }
          } else {
            setError("Enter Test Close Date!");
          }
        } else {
          setError("Enter Email IDs!");
        }
      } else {
        setError("Enter Job Id!");
      }
    } else {
      setError("Enter Job Name!");
    }
    return "";
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
    setCodingQuestions(init__codingQuestions);
    resetError();
  };

  const submitCodingTest = async (e) => {
    e.preventDefault();
    document.getElementById("submitButton").style.pointerEvents = "none";
    document.getElementById("submitButton").style.opacity = ".5";
    document.getElementById("submitButton").value = "Submitting...";
    resetError();
    let toSend = prepareData();
    toSend = {
      teacherId: TID,
      recieve: toSend,
    };
    if (toSend.recieve !== "") {
      let backupEmail = formdata.emailIds;
      let comma = formdata.emailIds.split(",");
      let semicolon = formdata.emailIds.split(";");
      let temp_email = "";
      if (comma.length > semicolon.length) {
        temp_email = comma;
      } else {
        temp_email = semicolon;
      }
      setFormdata({
        ...formdata,
        emailIds: temp_email,
      });
      toSend.recieve.emailIds = temp_email;
      axios.post("api/hr/tests", toSend).then((res) => {
        let data = res.data;
        if (data.message === "exists") {
          setError("Job Id exists already!");
          setFormdata({
            ...formdata,
            emailIds: backupEmail,
          });
        } else if (data.message === "nocredit") {
          setError("Not enough credit!");
  
          setFormdata({
            ...formdata,
            emailIds: backupEmail,
          });
        } else if (data.message === "idk") {
          setError("Internal problem!");
  
          setFormdata({
            ...formdata,
            emailIds: backupEmail,
          });
        } else {
          document.getElementById("submitButton").value = "Submitted";
          resetAll();
          setSuccess("Coding test created successfully!");
          
          axios.get("api/hr/users/" + TID).then((res) => {
            setTDATA(res.data);
          })
          
          setTimeout(function () {
            resetSuccess();
          }, 5000);
        }
        document.getElementById("submitButton").innerText = "Submit";
        document.getElementById("submitButton").style.pointerEvents = "unset";
        document.getElementById("submitButton").style.opacity = "1";
      })
    }
  };

  const setError = (text) => {
    let error = document.getElementById("error");
    error.innerHTML = text;
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

  return (
    <div className="NewTest__ CodingTest__">
      <div id="form" className="formNewTest">
        <TextField
          className="formNewTestMainDiv"
          variant="outlined"
          label="Job Name"
          type="text"
          name="jobName"
          value={formdata.jobName}
          onChange={changeFormdata}
        />
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
          multiline
          rows={4}
          label="Email IDs"
          type="text"
          name="emailIds"
          value={formdata.emailIds}
          onChange={changeFormdata}
          helperText="Seperate email id`s with ',' or ';'"
        />
        <CodingQuestionsComponent
          changeCodingQuestions={changeCodingQuestions}
          addCodingQuestion={addCodingQuestion}
          codingQuestions={codingQuestions}
          changeFormdata={changeFormdata}
          formdata={formdata}
        />
        <div className="dateTimeSelector">
          <TextField
            label="Test Close Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              className: "closeTime",
            }}
            name="testCloseDate"
            value={formdata.testCloseDate}
            onChange={changeFormdata}
            className="formNewTestMainDiv"
          />
          {/* defaultValue="2017-05-24" */}
          <TextField
            label="Test Close Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
              className: "closeTime",
            }}
            name="testCloseTime"
            value={formdata.testCloseTime}
            onChange={changeFormdata}
            className="formNewTestMainDiv"
          />
          {/* defaultValue="07:30" */}
        </div>
        <div id="error" style={{ display: "none" }}></div>
        <div id="success" style={{ display: "none" }}></div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="submitButton"
          id="submitButton"
          onClick={submitCodingTest}
          startIcon={<CloudUploadIcon />}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CodingTest;
