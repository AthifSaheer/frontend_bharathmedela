import React, { useEffect, useState } from "react";
import "./../styles/Dashboard.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SessionData from "./../components/SessionData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chart from "react-google-charts";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { studentDetailsAPI, allInfoAPI } from '../API/APIService'
import axios from "axios";

export default function Dashboard() {
  const { TDATA, setTDATA } = React.useContext(SessionData);
  const [info, setInfo] = useState([]);
  const [mcqHigh, setMcqHigh] = useState(0);
  const [mcqAverage, setMcqAverage] = useState(0);
  const [infoNum, setInfoNum] = useState(2);

  useEffect(() => {
    let StudentID = sessionStorage.getItem("token");
    let decoded_id = atob(atob(atob(StudentID)));

    axios.get(`${studentDetailsAPI}/${decoded_id}`)
    .then((res) => {
      console.log("res.data---", res.data);
      setTDATA(res.data);
    })

    axios.get(`${allInfoAPI}/${decoded_id}`)
    .then((res) => {
      setInfo(res.data);
      if (res.data.length > 0) {
        changeInfo(res.data);
      }
    })
  }, []);

  const changeInfo = (scores) => {
    let temp = [];
    scores.map((item) => {
      temp.push(parseInt(item.marks));
    });
    setMcqHigh(Math.max(...temp));
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    setMcqAverage(average(temp));
  };

  const [selection, setSelection] = useState({
    category: "",
    subCategory: "",
    noOfQuiz: 10,
  });
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const uniqueKeys = (listOfTags, keys) => {
    let filtered = listOfTags.filter(
      (
        (s) => (o) =>
          ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
      )(new Set())
    );
    return filtered;
  };

  const selectionChange = (e) => {
    if (e.target.name === "category") {
      selectedCategory(e);
    }
    if (e.target.name === "category") {
      let tt = {
        category: e.target.value,
        subCategory: "",
        noOfQuiz: selection.noOfQuiz,
      };
      setSelection(tt);
      updateLineChartData(tt);
    } else if (e.target.name === "subCategory") {
      let val = e.target.value !== "None" ? e.target.value : "";
      setSelection({
        category: selection.category,
        subCategory: val,
        noOfQuiz: selection.noOfQuiz,
      });
      updateLineChartData({
        category: selection.category,
        subCategory: val,
        noOfQuiz: selection.noOfQuiz,
      });
    } else if (e.target.name === "noOfQuiz") {
      let tt = {
        category: selection.category,
        subCategory: selection.subCategory,
        noOfQuiz: e.target.value,
      };
      setSelection(tt);
      updateLineChartData(tt);
    }
  };
  const selectedCategory = async (e) => {
    let option = e.target.value;
    if (option !== null || option !== "") {
      let temp = [];
      uniqueKeys(info, ["subCategory"]).map((item) => {
        if (item.category === e.target.value) {
          temp.push(item.subCategory);
        }
      });
      setSubCategory(["None", ...temp]);
    }
  };

  // Chart Data
  const [pieChartData, setPieChartData] = useState([
    ["Title", "Number of Tests"],
  ]);
  const [lineChartData, setLineChartData] = useState([]);
  useEffect(() => {
    if (info.length > 0) {
      let temp = [];
      uniqueKeys(info, ["category"]).map((item) => temp.push(item.category));
      setCategory(temp);
      updatePieChartData();
    }
  }, [info]);

  const updatePieChartData = () => {
    let temp1 = info;
    let temp2 = [];
    temp1.map((info, i) => {
      let found = false;
      temp2.map((item, j) => {
        if (info.category + "x" + info.subCategory === item[0]) {
          temp2[j][1] = temp2[j][1] + 1;
          found = true;
        }
      });
      if (!found) {
        let text = info.category + "x" + info.subCategory;
        temp2.push([text, 1]);
      }
    });
    setPieChartData([...pieChartData, ...temp2]);
  };

  const updateLineChartData = (selecto) => {
    let temp1 = info
      .slice()
      .sort((a, b) => new Date(b.utc) - new Date(a.utc))
      .reverse();
    let uniqueDates = [
      [
        "Title",
        "Marks",
        { role: "tooltip", type: "string", p: { html: true } },
      ],
    ];
    if (selecto.subCategory === "") {
      temp1.map((item, i) => {
        if (item.category === selecto.category) {
          if (uniqueDates.length <= selecto.noOfQuiz) {
            uniqueDates.push([
              item.date,
              item.marks,
              `${item.category}\n${item.time}`,
            ]);
          }
        }
      });
    } else {
      temp1.map((item, i) => {
        if (
          item.category === selecto.category &&
          item.subCategory === selecto.subCategory
        ) {
          if (uniqueDates.length <= selecto.noOfQuiz) {
            uniqueDates.push([
              item.date,
              item.marks,
              `${item.category}x${item.subCategory}\n${item.time}`,
            ]);
          }
        }
      });
    }
    setLineChartData([...uniqueDates]);
  };

  return (
    <>
      <Navbar data={TDATA} />
      <div className="__Dashboard">
        <div className="rightMain">
          <span className="heading">SIM Dashboard</span>
          <span className="subHeading">Statistics</span>
          <div className="cardWrapper">
            <div className="card">
              <span className="number blue">{mcqHigh}</span>
              <span className="label">MCQs Highest Marks</span>
            </div>
            <div className="card">
              <span className="number green">{Math.round(mcqAverage)}</span>
              <span className="label">MCQs Average Marks</span>
            </div>
            <div className="card">
              <span className="number blue">0</span>
              <span className="label">Test Highest Marks</span>
            </div>
            <div className="card">
              <span className="number green">0</span>
              <span className="label">Test Average Marks</span>
            </div>
          </div>
          <span className="heading margin">Analytics</span>
          <div className="analytics">
            <div className="one">
              <span className="subHeading">Quiz Time Series</span>
              <div className="selection">
                <FormControl className="formControl" fullWidth>
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
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className="formControl" fullWidth>
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
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="noOfQuiz">Number of Quiz</InputLabel>
                  <Select
                    labelId="Number of Quiz"
                    id="noOfQuiz"
                    name="noOfQuiz"
                    value={selection.noOfQuiz}
                    label="Number of Quiz"
                    onChange={selectionChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
              {selection.category ? (
                <div className="lineGraph">
                  <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={lineChartData}
                    options={{
                      hAxis: {
                        title: "Dates (MM/DD/YYYY)",
                      },
                      vAxis: {
                        title: "Marks",
                      },
                      is3D: true,
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              ) : (
                <div>Please configure the graph view.</div>
              )}
            </div>
            <div className="one pieChartWrapper">
              <span className="subHeading">Quiz Pie Chart</span>
              <div className="pieChart">
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={pieChartData}
                  options={{
                    // Just add this option
                    is3D: true,
                    legend: { alignment: "center", position: "bottom" },
                  }}
                  rootProps={{ "data-testid": "2" }}
                />
              </div>
            </div>
          </div>
          <div className="analytics">
            <div className="one">
              <span className="subHeading">Test Time Series</span>
              <div className="selection">
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="category">Topic</InputLabel>
                  <Select
                    labelId="Category"
                    id="category"
                    name="category"
                    label="Category"
                  ></Select>
                </FormControl>
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="subCategory">Sub Topic</InputLabel>
                  <Select
                    labelId="Sub Category"
                    id="subCategory"
                    name="subCategory"
                    label="Sub Category"
                  ></Select>
                </FormControl>
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="noOfQuiz">Number of Quiz</InputLabel>
                  <Select
                    labelId="Number of Quiz"
                    id="noOfQuiz"
                    name="noOfQuiz"
                    label="Number of Quiz"
                  ></Select>
                </FormControl>
              </div>
              {!true ? (
                <div className="lineGraph">
                  <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[]}
                    options={{
                      hAxis: {
                        title: "Dates (MM/DD/YYYY)",
                      },
                      vAxis: {
                        title: "Marks",
                      },
                      is3D: true,
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              ) : (
                <div>Please configure the graph view.</div>
              )}
            </div>
            <div className="one pieChartWrapper">
              <span className="subHeading">Test Pie Chart</span>
              <div className="pieChart">
                {!true ? (
                  <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[]}
                    options={{
                      // Just add this option
                      is3D: true,
                      legend: { alignment: "center", position: "bottom" },
                    }}
                    rootProps={{ "data-testid": "2" }}
                  />
                ) : (
                  <div>No data found.</div>
                )}
              </div>
            </div>
          </div>
          <span className="heading margin">Recent Results</span>
          <div className="resultWrapper">
            {info.slice(0, infoNum).map((item, i) => {
              return (
                <div className="result">
                  <div className="left">
                    <span className="line">
                      <span className="attr">Topic:</span>
                      <span className="val">{item.category}</span>
                    </span>
                    <span className="line">
                      <span className="attr">Sub-Topic:</span>
                      <span className="val">{item.subCategory}</span>
                    </span>
                    <span className="line">
                      <span className="attr">Type:</span>
                      <span className="val">MCQs</span>
                    </span>
                  </div>
                  <div className="right">
                    <span className="attr">Score</span>
                    <span className="val">{item.marks}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {infoNum < info.length ? (
            <span
              className="viewMore"
              onClick={() => {
                setInfoNum((old) => {
                  return old + 2;
                });
              }}
            >
              View more results ({infoNum} of {info.length})
            </span>
          ) : (
            ""
          )}
        </div>
        {/* <div className="leftMain">
          <span className="heading">Welcome</span>
          <span className="subHeading">
            {TDATA.firstname || "Guest"} {TDATA.lastname}
          </span>
          <span className="credits">
            Credits: <span className="val">{TDATA.credits || 0}</span>
          </span>
          <div className="cardWrapper">
            <Link to="/mcqTest">
              <div className="card white">
                <div className="left">
                  <span className="l1">Take a MCQ Test</span>
                  <span className="l2">Test your knowledge!</span>
                </div>
                <div className="right">
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
            <Link to="/talkToTeacher">
              <div className="card black">
                <div className="left">
                  <span className="l1">Talk to a Teacher</span>
                  <span className="l2">Consult a teacher.</span>
                </div>
                <div className="right">
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
            <Link to="#">
              <div className="card white">
                <div className="left">
                  <span className="l1">Learn something new</span>
                  <span className="l2">Check out our blog.</span>
                </div>
                <div className="right">
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </>
  );
}
