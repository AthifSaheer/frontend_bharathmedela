import React, { useEffect, useState, useRef } from "react";
import "./../styles/MCQTest.scss";
import SessionData from "./../components/SessionData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function MCQTest() {
  const history = useHistory();
  const { TDATA, setTDATA } = React.useContext(SessionData);
  useEffect(async () => {
    let res = await axios.get("api/quizCategory");
    setCategory(res.data);
  }, []);
  const configureQuiz = () => {
    return (
      <>
        <img className="wave" src="/frontend/static/images/wave.png" />
        <div className="container">
          <div className="img">
            <img src="/frontend/static/images/Quiz-cat-select.svg" />
          </div>
          <div className="login-content">
            <div className={`form`}>
              <h2 className="title">Configure Quiz</h2>
              {TDATA.credits <= 0 ? (
                <span className="msg">Not enough credits</span>
              ) : (
                ""
              )}
              <FormControl
                className="formControl"
                fullWidth
                disabled={category.length > 0 ? false : true}
              >
                <InputLabel id="category">Topic</InputLabel>
                <Select
                  labelId="Category"
                  id="category"
                  name="category"
                  value={selection.category}
                  label="Category"
                  onChange={selectionChange}
                >
                  {category.map((item, i) => {
                    return (
                      <MenuItem value={item.category}>{item.category}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                className="formControl"
                fullWidth
                disabled={subCategory.length > 0 ? false : true}
              >
                <InputLabel id="subCategory">Sub Topic</InputLabel>
                <Select
                  labelId="Sub Category"
                  id="subCategory"
                  name="subCategory"
                  value={selection.subCategory}
                  label="Sub Category"
                  onChange={selectionChange}
                >
                  {subCategory.map((item, i) => {
                    return (
                      <MenuItem value={item.subCategory}>
                        {item.subCategory}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                className="formControl"
                fullWidth
                disabled={difficulty.length > 0 ? false : true}
              >
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select
                  labelId="Difficulty"
                  id="difficulty"
                  name="difficulty"
                  value={selection.difficulty}
                  label="Difficulty"
                  onChange={selectionChange}
                >
                  {difficulty.map((item, i) => {
                    return (
                      <MenuItem value={item.difficultyLevel}>
                        {item.difficultyLevel}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <input
                type="submit"
                class={`btn ${
                  TDATA.credits <= 0 ||
                  selection.category === "" ||
                  selection.subCategory === "" ||
                  selection.difficulty === ""
                    ? "hide"
                    : ""
                }`}
                value="Take Test"
                onClick={() => {
                  if (TDATA.credits > 0) {
                    setIsStart(true);
                    getQuiz();
                  }
                  else{
                    alert("Don't try to breach kiddo.")
                  }
                }}
              ></input>
            </div>
          </div>
        </div>
      </>
    );
  };
  const [selection, setSelection] = useState({
    category: "",
    subCategory: "",
    difficulty: "",
  });
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const selectionChange = (e) => {
    if (e.target.name === "category") {
      selectedCategory(e);
      setDifficulty([]);
    } else if (e.target.name === "subCategory") {
      selectedSubCategory(e);
    }
    if (e.target.name === "category") {
      setSelection({
        category: e.target.value,
        subCategory: "",
        difficulty: "",
      });
    } else if (e.target.name === "subCategory") {
      setSelection({
        category: selection.category,
        subCategory: e.target.value,
        difficulty: "",
      });
    } else {
      setSelection({
        ...selection,
        [e.target.name]: e.target.value,
      });
    }
  };
  const selectedCategory = async (e) => {
    let option = e.target.value;
    if (option !== null || option !== "") {
      let res = await axios.get("api/quizSubCategory?category=" + option);
      setSubCategory([
        ...res.data,
        {
          id: 0,
          category: "",
          subCategory: "General",
          difficultyLevel: "",
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correct: "",
        },
      ]);
    }
  };
  const selectedSubCategory = async (e) => {
    let option = e.target.value;
    if (option !== null || option !== "") {
      let res = await axios.get(
        "api/quizDifficulty?category=" +
          selection.category +
          "&subCategory=" +
          option
      );
      if (res.data.length < 1) {
        setDifficulty([
          {
            id: 0,
            category: "",
            subCategory: "",
            difficultyLevel: "Easy",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "",
          },
          {
            id: 0,
            category: "",
            subCategory: "",
            difficultyLevel: "Hard",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "",
          },
          {
            id: 0,
            category: "",
            subCategory: "",
            difficultyLevel: "Medium",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "",
          },
          {
            id: 0,
            category: "",
            subCategory: "",
            difficultyLevel: "Mixed",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "",
          },
        ]);
      } else {
        setDifficulty([
          ...res.data,
          {
            id: 0,
            category: "",
            subCategory: "",
            difficultyLevel: "Mixed",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "",
          },
        ]);
      }
    }
  };
  // Part 1 End

  function secondsToTime(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (parseInt(hours) === 0) {
      return minutes + ":" + seconds; // Return is MM : SS
    }
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const setEnvironment = (data) => {
    let temp = [];
    data.map((item, i) => {
      temp.push({
        ...item,
        options: shuffle([
          item.optionA,
          item.optionB,
          item.optionC,
          item.optionD,
        ]),
        attemptAnswer: "",
      });
    });
    setQuestions(temp);
  };
  const attemptAnswer = (e, index) => {
    let temp = [...questions];
    temp[index].attemptAnswer = e.target.value;
    setQuestions(temp);
  };

  const startQuiz = () => {
    return (
      <>
        <div className="startQuiz">
          <span className="heading">Quiz</span>
          <div className="timer">
            <span className="left">
              {secondsToTime(timeElapsed)} / {secondsToTime(timeLimit.current)}
            </span>
          </div>
          <div className="questionWrapper">
            {questions.length > 0 && questions[0].hasOwnProperty("options")
              ? questions.map((item, i) => {
                  return (
                    <div className="questionTab">
                      <div className="optionsTab">
                        <FormControl component="fieldset">
                          <FormLabel component="legend" className="question">
                            Q{i + 1}) {item.question}
                          </FormLabel>
                          <RadioGroup
                            defaultValue=""
                            name={`question${i}`}
                            className="radioGroup"
                            onChange={(e) => {
                              attemptAnswer(e, i);
                            }}
                          >
                            {item.options.map((option, j) => {
                              return (
                                <FormControlLabel
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  );
                })
              : "Loading..."}
          </div>
          <input
            type="submit"
            class="btn"
            value="Submit"
            onClick={() => {
              submission(questions);
            }}
          ></input>
        </div>
      </>
    );
  };

  const [isResult, setIsResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(1);
  const timeLimit = useRef(10*60);
  const [timeUp, setTimeUp] = useState(false);
  const intervalID = useRef(null);
  const getQuiz = async () => {
    let res = await axios.get(
      "api/getQuiz?category=" +
        selection.category +
        "&subCategory=" +
        selection.subCategory +
        "&difficulty=" +
        selection.difficulty
    );
    setEnvironment(res.data);
    let id = setInterval(() => {
      setTimeElapsed((old) => {
        if (old >= timeLimit.current - 1) {
          clearInterval(intervalID.current);
          setTimeUp(true);
        }
        return old + 1;
      });
    }, 1000);
    intervalID.current = id;
  };

  useEffect(() => {
    if (timeUp) {
      submission(questions);
    }
  }, [timeUp, questions]);

  const score = useRef(0);
  const tScore = useRef(0);

  const submission = async (questions) => {
    console.log(questions);
    let totalScore = 0;
    questions.map((item, i) => {
      if (item.correct === item.attemptAnswer) {
        totalScore++;
      }
    });
    tScore.current = questions.length * 10;
    score.current = totalScore * 10;
    let utc = new Date();
    let number = utc.getTime();
    let dateBREAK = new Date(parseInt(number)).toLocaleString().split(", ");
    let res = axios.post("api/score", {
      studentId: TDATA.id,
      marks: score.current,
      date: dateBREAK[0],
      time: dateBREAK[1],
      utc: utc,
      category: selection.category,
      subCategory: selection.subCategory,
      difficultyLevel: selection.difficulty,
    });
    if (!res.message) {
      setIsResult(true);
    }
  };

  // Tab End of Exam

  const resultTab = () => {
    return (
      <>
        <div className="resultTab">
          <div className="heading">Answers</div>
          <div className="left">
            <table>
              <tr>
                <th>Q#</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
              </tr>
              {questions.length > 0 &&
                questions.map((item, i) => {
                  return (
                    <tr>
                      <td
                        className={`${
                          item.attemptAnswer === ""
                            ? "no"
                            : item.attemptAnswer === item.correct
                            ? "correct"
                            : "wrong"
                        }`}
                      >
                        Q{i + 1}
                      </td>
                      <td
                        className={`${
                          item.attemptAnswer === ""
                            ? "no"
                            : item.attemptAnswer === item.correct
                            ? "correct"
                            : "wrong"
                        }`}
                      >
                        {item.attemptAnswer}
                      </td>
                      <td
                        className={`${
                          item.attemptAnswer === ""
                            ? "no"
                            : item.attemptAnswer === item.correct
                            ? "correct"
                            : "wrong"
                        }`}
                      >
                        {item.correct}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <div className="right">
            <span>
              Topic : <span>{selection.category}</span>
            </span>
            <span>
              Sub Topic : <span>{selection.subCategory}</span>
            </span>
            <span>
              Difficulty Level : <span>{selection.difficulty}</span>
            </span>
            <span>
              Score : <span>{score.current}</span>/100
            </span>
            <input
              type="submit"
              class="btn"
              value="Back To Dashboard"
              onClick={() => {
                history.push("/");
              }}
            ></input>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="__MCQTest">
      {!isStart
        ? configureQuiz()
        : isStart && !isResult
        ? startQuiz()
        : resultTab()}
    </div>
  );
}
