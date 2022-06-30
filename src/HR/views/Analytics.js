import React, { useEffect, useState } from "react";
import "./../css/Analytics.scss";
import Collapsible from "react-collapsible";
import { DataGrid } from "@material-ui/data-grid";
import Chart from "react-google-charts";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const axios = require("axios");

function Drawer(props) {
  const jobId = props.jobId;
  const teacherId = props.teacherId;
  let triggerName = "Job ID : " + jobId;
  const [scores, setScores] = useState([]);
  const [dfb, setdfb] = useState([]);
  const [dfp, setdfp] = useState([]);

  // function convertDate(date) {
  //   let current_datetime = new Date(date);
  //   let formatted_date =
  //     current_datetime.getFullYear() +
  //     "-" +
  //     (current_datetime.getMonth() + 1) +
  //     "-" +
  //     current_datetime.getDate() +
  //     " " +
  //     current_datetime.getHours() +
  //     ":" +
  //     current_datetime.getMinutes();
  //   return formatted_date;
  // }

  useEffect(async () => {
    let res = await axios.get(
      "api/hr/score" + jobId + "&&teacherId=" + teacherId
    );
    setScores(res.data);
    let temp__ = [["Student", "Score 1", "Score 2", "Score 3"]];
    res.data.map((score) => {
      let temp__1 = [
        score.emailId,
        parseInt(score.score1),
        parseInt(score.score2),
        parseInt(score.score3),
      ];
      temp__.push(temp__1);
    });
    setdfb(temp__);
    setdfp([
      ["Type", "Numbers"],
      ["Completed", res.data.length],
      ["Pending", parseInt(props.countOfStudents) - parseInt(res.data.length)],
    ]);
  }, []);

  const columns = [
    { field: "emailId", headerName: "Name", width: 150 },
    { field: "score1", headerName: "Score 1", width: 150, type: "number" },
    { field: "score2", headerName: "Score 2", width: 150, type: "number" },
    { field: "score3", headerName: "Score 3", width: 150, type: "number" },
    { field: "total", headerName: "Total", width: 150, type: "number" },
  ];

  return (
    <>
      <Collapsible trigger={triggerName}>
        <div className="infoDrawer">
          <span>Total Number of Students : {props.countOfStudents}</span>
          <span>Total Completed : {scores.length}</span>
          <span>
            Total Pending :{" "}
            {parseInt(props.countOfStudents) - parseInt(scores.length)}
          </span>
        </div>
        <div className="drawerCharts">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <div className="chart graph-chart">
                {scores.length > 0 ? (
                  <>
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="Bar"
                      loader={<div>Loading Chart</div>}
                      data={dfb}
                      options={{
                        title: "Score Comparison",
                        hAxis: {
                          title: "Scoring",
                          minValue: 0,
                        },
                        vAxis: {
                          title: "Students",
                        },
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="chart">
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={dfp}
                  options={{
                    title: "Completion Rate",
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={scores} columns={columns} />
        </div>
      </Collapsible>
    </>
  );
}

function Analytics(props) {
  const [TID, setTeacherId] = useState(null);
  const [tests, setTests] = useState([]);
  useEffect(async () => {
    let TeacherID = sessionStorage.getItem("token_hr");
    let temp__ = atob(atob(atob(TeacherID)));
    setTeacherId(temp__);

    axios.get("api/hr/tests" + temp__).then((res) => {
      setTests(res.data);
    })
  }, []);

  const [search, setSearch] = useState("");

  return (
    <>
      <div className="Analytics__">
        <div className="searchBox">
          <TextField
            label="Search Tests"
            margin="normal"
            style={{ width: "100%" }}
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {tests
          .filter((test) => {
            return test.jobId.toLowerCase().includes(search.toLowerCase());
          })
          .map((test, index) => {
            return (
              <>
                <Drawer
                  jobId={test.jobId}
                  teacherId={TID}
                  countOfStudents={test.emailIds.length}
                />
              </>
            );
          })}
      </div>
    </>
  );
}

export default Analytics;
