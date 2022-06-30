import React, { useState, useEffect } from "react";
import "./../css/NewTest.scss";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SessionData from "./../components/SessionData";
import { HRUserDetailsAPI, HRSystemQuestnAPI, HRSystemMcqsAPI, HRTestsListAPI } from '../API/APIService'

const axios = require("axios");
function OwnQuestionsComponent(props) {
  return (
    <>
      <div className="ownQuestions">
        {props.ownQuestions.map((data, index) => {
          return (
            <div key={index} className="ownQuestionsOne">
              <TextField
                className="formNewTestMainDiv"
                variant="outlined"
                label={`Question ${index + 1}`}
                type="text"
                name="question"
                onChange={(e) => {
                  props.changeOwnQuestions(index, e);
                }}
                value={data.question}
              />
              <TextField
                className="formNewTestMainDiv"
                variant="outlined"
                label={`Expected Answer ${index + 1}`}
                type="text"
                name="answer"
                onChange={(e) => {
                  props.changeOwnQuestions(index, e);
                }}
                value={data.answer}
              />
            </div>
          );
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className="addNewQuestionButton"
        startIcon={<AddBoxIcon />}
        onClick={props.addQuestion}
      >
        Add Question
      </Button>
    </>
  );
}

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

function NewTest(props) {
  const { TDATA, setTDATA } = React.useContext(SessionData);
  const [TID, setTeacherId] = useState(null);
  useEffect(() => {
    let TeacherID = sessionStorage.getItem("token_hr");
    setTeacherId(atob(atob(atob(TeacherID))));
  }, []);
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [systemQuestions, setSystemQuestions] = new useState();
  const [systemTopics, setSystemTopics] = new useState([]);
  const [systemSubTopics, setSystemSubTopics] = new useState([]);
  const [systemDifficultyLevels, setSystemDifficultyLevels] = new useState([]);
  useEffect(() => {
    axios.get(HRSystemQuestnAPI).then((res) => {
      setSystemQuestions(res.data);
      res.data.map((question) => {
        if (!systemTopics.includes(question.Topic)) {
          systemTopics.push(question.Topic);
        }
        let same = false;
        for (let i = 0; i < systemSubTopics.length; i++) {
          if (
            systemSubTopics[i].topic === question.Topic &&
            systemSubTopics[i].subTopic == question.SubTopic
          ) {
            same = true;
            break;
          }
        }
        if (!same) {
          systemSubTopics.push({
            topic: question.Topic,
            subTopic: question.SubTopic,
          });
        }
        if (!systemDifficultyLevels.includes(question.DifficultyLevel)) {
          systemDifficultyLevels.push(question.DifficultyLevel);
        }
      });
    })
  }, []);
  // MCQ
  const [systemMCQs, setSystemMCQs] = new useState();
  const [systemTopicsMCQ, setSystemTopicsMCQ] = new useState([]);
  const [systemSubTopicsMCQ, setSystemSubTopicsMCQ] = new useState([]);
  const [systemDifficultyLevelsMCQ, setSystemDifficultyLevelsMCQ] =
    new useState([]);
  useEffect(() => {
    axios.get(HRSystemMcqsAPI).then((res) => {
      setSystemMCQs(res.data);
      res.data.map((mcq) => {
        if (!systemTopicsMCQ.includes(mcq.Topic)) {
          systemTopicsMCQ.push(mcq.Topic);
        }
        let same = false;
        for (let i = 0; i < systemSubTopicsMCQ.length; i++) {
          if (
            systemSubTopicsMCQ[i].topic === mcq.Topic &&
            systemSubTopicsMCQ[i].subTopic == mcq.SubTopic
          ) {
            same = true;
            break;
          }
        }
        if (!same) {
          systemSubTopicsMCQ.push({
            topic: mcq.Topic,
            subTopic: mcq.SubTopic,
          });
        }
        if (!systemDifficultyLevelsMCQ.includes(mcq.DifficultyLevel)) {
          systemDifficultyLevelsMCQ.push(mcq.DifficultyLevel);
        }
      });
    })
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
    type: "normalTest",
  };
  const [mcqFormData, setMcqFormData] = new useState({
    chooseTopic: "",
    chooseSubTopic: "",
    numberOfQuestions: "",
    difficultyLevel: "",
  });
  const changeMcqFormdata = (e) => {
    setMcqFormData({
      ...mcqFormData,
      [e.target.name]: e.target.value,
    });
  };
  const [formdata, setFormdata] = new useState(init__formdata);
  const changeFormdata = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const [isOwnQuestions, setIsOwnQuestions] = new useState(null);
  const [isStillQuestions, setIsStillQuestions] = new useState(null);
  const [isCodingQuestions, setIsCodingQuestions] = new useState(null);
  const [isMCQ, setIsMCQ] = new useState(null);

  const init__ownQuestions = [
    {
      question: "",
      answer: "",
    },
    {
      question: "",
      answer: "",
    },
  ];
  const [ownQuestions, setOwnQuestions] = new useState(init__ownQuestions);

  const changeOwnQuestions = (index, e) => {
    let values = [...ownQuestions];
    values[index][e.target.name] = e.target.value;
    setOwnQuestions(values);
  };

  const addQuestion = () => {
    setOwnQuestions([
      ...ownQuestions,
      {
        question: "",
        answer: "",
      },
    ]);
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

  const setError = (text) => {
    let error = document.getElementById("error");
    error.innerHTML = text;
    error.style.display = "block";
    document.getElementById("submitButton").style.pointerEvents = "unset";
    document.getElementById("submitButton").style.opacity = "1";
    document.getElementById("submitButton").innerText = "SUBMIT";
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

  const prepareData = () => {
    let finalData = formdata;
    if (formdata.jobName !== "") {
      if (formdata.jobId !== "") {
        if (formdata.emailIds !== "") {
          if (formdata.testCloseDate !== "") {
            if (formdata.testCloseTime !== "") {
              let questions = [];
              let questionsCoding = [];
              let mcqs = [];
              if (isOwnQuestions === true || isStillQuestions === true) {
                ownQuestions.map((T, key) => {
                  if (T.question !== "" && T.answer === "") {
                    setError("Enter Answer for Question #" + (key + 1));
                  } else if (T.question === "" && T.answer !== "") {
                    setError("Enter Question for Answer #" + (key + 1));
                  } else if (T.question !== "" && T.answer !== "") {
                    questions.push({
                      question: T.question,
                      answer: T.answer,
                    });
                  }
                });
              }
              if (isOwnQuestions === false) {
                if (formdata.chooseTopic !== "") {
                  if (formdata.chooseSubTopic !== "") {
                    if (formdata.numberOfQuestions !== "") {
                      if (formdata.difficultyLevel !== "") {
                        let filtered = [];
                        if (
                          formdata.difficultyLevel === "Mix" &&
                          formdata.chooseSubTopic === "Mix"
                        ) {
                          filtered = systemQuestions.filter((T) => {
                            return T.Topic === formdata.chooseTopic;
                          });
                        } else if (
                          formdata.difficultyLevel === "Mix" &&
                          formdata.chooseSubTopic !== "Mix"
                        ) {
                          filtered = systemQuestions.filter((T) => {
                            return (
                              T.Topic === formdata.chooseTopic &&
                              T.SubTopic === formdata.chooseSubTopic
                            );
                          });
                        } else if (
                          formdata.difficultyLevel !== "Mix" &&
                          formdata.chooseSubTopic === "Mix"
                        ) {
                          filtered = systemQuestions.filter((T) => {
                            return (
                              T.Topic === formdata.chooseTopic &&
                              T.DifficultyLevel === formdata.difficultyLevel
                            );
                          });
                        } else {
                          filtered = systemQuestions.filter((T) => {
                            return (
                              T.Topic === formdata.chooseTopic &&
                              T.DifficultyLevel === formdata.difficultyLevel &&
                              T.SubTopic === formdata.chooseSubTopic
                            );
                          });
                        }
                        if (filtered.length < formdata.numberOfQuestions) {
                          filtered = systemQuestions.filter((T) => {
                            return (
                              T.Topic === formdata.chooseTopic &&
                              T.SubTopic === formdata.chooseSubTopic
                            );
                          });
                        }
                        for (let i = 0; i < formdata.numberOfQuestions; i++) {
                          let done = false;
                          while (!done) {
                            let P = filtered[getRandom(0, filtered.length - 1)];
                            let exists = questions.filter((L) => {
                              return (
                                L.question === P.Question &&
                                L.answer === P.Answer
                              );
                            });
                            if (exists.length === 0) {
                              questions.push({
                                question: P.Question,
                                answer: P.Answer,
                              });
                              done = true;
                            }
                          }
                        }
                      } else {
                        setError("Select Difficulty Level!");
                      }
                    } else {
                      setError("Select Number of Questions!");
                    }
                  } else {
                    setError("Select Sub Topic!");
                  }
                } else {
                  setError("Select Topic!");
                }
              }
              if (isOwnQuestions === null) {
                setError("Choose Questions!");
              }
              if (questions.length === 0) {
                setError("Enter Questions!");
              }
              if (!isError()) {
                setFormdata({
                  ...formdata,
                  questions: questions,
                });
                if (isMCQ === true) {
                  if (mcqFormData.chooseTopic !== "") {
                    if (mcqFormData.chooseSubTopic !== "") {
                      if (mcqFormData.numberOfQuestions !== "") {
                        if (mcqFormData.difficultyLevel !== "") {
                          let filtered = [];
                          if (
                            mcqFormData.difficultyLevel === "Mix" &&
                            mcqFormData.chooseSubTopic === "Mix"
                          ) {
                            filtered = systemMCQs.filter((T) => {
                              return T.Topic === mcqFormData.chooseTopic;
                            });
                          } else if (
                            mcqFormData.difficultyLevel === "Mix" &&
                            mcqFormData.chooseSubTopic !== "Mix"
                          ) {
                            filtered = systemMCQs.filter((T) => {
                              return (
                                T.Topic === mcqFormData.chooseTopic &&
                                T.SubTopic === mcqFormData.chooseSubTopic
                              );
                            });
                          } else if (
                            mcqFormData.difficultyLevel !== "Mix" &&
                            mcqFormData.chooseSubTopic === "Mix"
                          ) {
                            filtered = systemMCQs.filter((T) => {
                              return (
                                T.Topic === mcqFormData.chooseTopic &&
                                T.DifficultyLevel ===
                                  mcqFormData.difficultyLevel
                              );
                            });
                          } else {
                            filtered = systemMCQs.filter((T) => {
                              return (
                                T.Topic === mcqFormData.chooseTopic &&
                                T.DifficultyLevel ===
                                  mcqFormData.difficultyLevel &&
                                T.SubTopic === mcqFormData.chooseSubTopic
                              );
                            });
                          }
                          if (filtered.length < mcqFormData.numberOfQuestions) {
                            filtered = systemMCQs.filter((T) => {
                              return (
                                T.Topic === mcqFormData.chooseTopic &&
                                T.SubTopic === mcqFormData.chooseSubTopic
                              );
                            });
                          }
                          for (
                            let i = 0;
                            i < mcqFormData.numberOfQuestions;
                            i++
                          ) {
                            let done = false;
                            while (!done) {
                              let P =
                                filtered[getRandom(0, filtered.length - 1)];
                              let exists = mcqs.filter((L) => {
                                return (
                                  L.question === P.Question &&
                                  L.answer === P.Answer
                                );
                              });
                              if (exists.length === 0) {
                                mcqs.push({
                                  question: P.Question,
                                  answer: P.Answer,
                                });
                                done = true;
                              }
                            }
                          }
                        } else {
                          setError("Select Difficulty Level of MCQ Test!");
                        }
                      } else {
                        setError("Select Number of Questions of MCQ Test!");
                      }
                    } else {
                      setError("Select Sub Topic of MCQ Test!");
                    }
                  } else {
                    setError("Select Topic of MCQ Test!");
                  }
                }
                if (isCodingQuestions === true) {
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
                }
                if (!isError()) {
                  setFormdata({
                    ...formdata,
                    MCQQuestions: mcqs,
                  });
                  finalData.questions = questions;
                  finalData.codingQuestions = questionsCoding;
                  finalData.MCQQuestions = mcqs;
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

  const resetAll = () => {
    setFormdata(init__formdata);
    setMcqFormData({
      chooseTopic: "",
      chooseSubTopic: "",
      numberOfQuestions: "",
      difficultyLevel: "",
    });
    setIsOwnQuestions(null);
    setIsStillQuestions(null);
    setIsCodingQuestions(null);
    setIsMCQ(null);
    setOwnQuestions(init__ownQuestions);
    setCodingQuestions(init__codingQuestions);
    resetError();
  };

  useEffect(() => {
    setFormdata({
      ...formdata,
      chooseSubTopic: "",
    });
  }, [formdata.chooseTopic]);

  useEffect(() => {
    setMcqFormData({
      ...mcqFormData,
      chooseSubTopic: "",
    });
  }, [mcqFormData.chooseTopic]);

  const submitTest = async (e) => {
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
      axios.post(HRTestsListAPI, toSend).then((res) => {
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
          setSuccess("Test created successfully!");

          axios.get(`${HRUserDetailsAPI}/${TID}`).then((res) => {
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

  return (
    <div className="NewTest__">
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
        <Divider />
        <div className="questionNewTest">
          <h3>Do you want to choose your own questions?</h3>
          <br />
          <ButtonGroup variant="contained" color="primary">
            <Button
              className={isOwnQuestions === true ? "tick" : ""}
              onClick={() => setIsOwnQuestions(true)}
            >
              Yes
            </Button>
            <Button
              className={isOwnQuestions === false ? "tick" : ""}
              onClick={() => setIsOwnQuestions(false)}
            >
              No
            </Button>
          </ButtonGroup>
        </div>
        <Divider />
        {isOwnQuestions === true ? (
          <OwnQuestionsComponent
            changeOwnQuestions={changeOwnQuestions}
            addQuestion={addQuestion}
            ownQuestions={ownQuestions}
          />
        ) : isOwnQuestions === false ? (
          <div className="systemQuestions">
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Choose Topic</InputLabel>
              <Select
                value={formdata.chooseTopic}
                name="chooseTopic"
                onChange={changeFormdata}
                label="Choose Topic"
              >
                {systemTopics.map((topic, key) => {
                  return <MenuItem value={topic}>{topic}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Choose Sub Topic</InputLabel>
              <Select
                value={formdata.chooseSubTopic}
                name="chooseSubTopic"
                onChange={changeFormdata}
                label="Choose Sub Topic"
              >
                {systemSubTopics
                  .filter((el) => {
                    return el.topic === formdata.chooseTopic;
                  })
                  .map((data, key) => {
                    return (
                      <MenuItem value={data.subTopic}>{data.subTopic}</MenuItem>
                    );
                  })}
                <MenuItem value="Mix">Mix</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Number of Questions</InputLabel>
              <Select
                value={formdata.numberOfQuestions}
                name="numberOfQuestions"
                onChange={changeFormdata}
                label="Number of Questions"
              >
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25,
                ].map((number, key) => {
                  return <MenuItem value={number}>{number}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={formdata.difficultyLevel}
                name="difficultyLevel"
                onChange={changeFormdata}
                label="Difficulty Level"
              >
                {systemDifficultyLevels.map((DifficultyLevel, key) => {
                  return (
                    <MenuItem value={DifficultyLevel}>
                      {DifficultyLevel}
                    </MenuItem>
                  );
                })}
                <MenuItem value="Mix">Mix</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          ""
        )}
        {isOwnQuestions === false ? (
          <>
            <Divider />
            <div className="questionNewTest">
              <h3>Do you still have your own questions?</h3>
              <br />
              <ButtonGroup variant="contained" color="primary">
                <Button
                  className={isStillQuestions === true ? "tick" : ""}
                  onClick={() => setIsStillQuestions(true)}
                >
                  Yes
                </Button>
                <Button
                  className={isStillQuestions === false ? "tick" : ""}
                  onClick={() => setIsStillQuestions(false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </div>
            <Divider />
          </>
        ) : (
          ""
        )}
        {isStillQuestions === true && isOwnQuestions === false ? (
          <OwnQuestionsComponent
            changeOwnQuestions={changeOwnQuestions}
            addQuestion={addQuestion}
            ownQuestions={ownQuestions}
          />
        ) : (
          ""
        )}
        {isOwnQuestions !== null ? (
          <>
            <Divider />
            <div className="questionNewTest">
              <h3>Do you want to include coding test?</h3>
              <br />
              <ButtonGroup variant="contained" color="primary">
                <Button
                  className={isCodingQuestions === true ? "tick" : ""}
                  onClick={() => setIsCodingQuestions(true)}
                >
                  Yes
                </Button>
                <Button
                  className={isCodingQuestions === false ? "tick" : ""}
                  onClick={() => setIsCodingQuestions(false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </div>
            <Divider />
          </>
        ) : (
          ""
        )}
        {isCodingQuestions === true ? (
          <CodingQuestionsComponent
            changeCodingQuestions={changeCodingQuestions}
            addCodingQuestion={addCodingQuestion}
            codingQuestions={codingQuestions}
            changeFormdata={changeFormdata}
            formdata={formdata}
          />
        ) : (
          ""
        )}
        <Divider />
        <div className="questionNewTest">
          <h3>Do you want to include MCQ test?</h3>
          <br />
          <ButtonGroup variant="contained" color="primary">
            <Button
              className={isMCQ === true ? "tick" : ""}
              onClick={() => setIsMCQ(true)}
            >
              Yes
            </Button>
            <Button
              className={isMCQ === false ? "tick" : ""}
              onClick={() => setIsMCQ(false)}
            >
              No
            </Button>
          </ButtonGroup>
        </div>
        <Divider />
        {isMCQ === true ? (
          <div className="systemQuestions">
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Choose Topic</InputLabel>
              <Select
                value={mcqFormData.chooseTopic}
                name="chooseTopic"
                onChange={changeMcqFormdata}
                label="Choose Topic"
              >
                {systemTopicsMCQ.map((topic, key) => {
                  return <MenuItem value={topic}>{topic}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Choose Sub Topic</InputLabel>
              <Select
                value={mcqFormData.chooseSubTopic}
                name="chooseSubTopic"
                onChange={changeMcqFormdata}
                label="Choose Sub Topic"
              >
                {systemSubTopicsMCQ
                  .filter((el) => {
                    return el.topic === mcqFormData.chooseTopic;
                  })
                  .map((data, key) => {
                    return (
                      <MenuItem value={data.subTopic}>{data.subTopic}</MenuItem>
                    );
                  })}
                <MenuItem value="Mix">Mix</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Number of Questions</InputLabel>
              <Select
                value={mcqFormData.numberOfQuestions}
                name="numberOfQuestions"
                onChange={changeMcqFormdata}
                label="Number of Questions"
              >
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25,
                ].map((number, key) => {
                  return <MenuItem value={number}>{number}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="formNewTestMainDiv">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={mcqFormData.difficultyLevel}
                name="difficultyLevel"
                onChange={changeMcqFormdata}
                label="Difficulty Level"
              >
                {systemDifficultyLevelsMCQ.map((DifficultyLevel, key) => {
                  return (
                    <MenuItem value={DifficultyLevel}>
                      {DifficultyLevel}
                    </MenuItem>
                  );
                })}
                <MenuItem value="Mix">Mix</MenuItem>
              </Select>
            </FormControl>
            <Divider />
          </div>
        ) : (
          ""
        )}
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
          onClick={submitTest}
          startIcon={<CloudUploadIcon />}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default NewTest;
