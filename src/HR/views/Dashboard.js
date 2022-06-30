import React from "react";
import "./../css/Dashboard.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
console.log("working well 001 -------");

function CustomCard(props) {
  const classes = useStyles();
  return (
    <Link to={props.to} className="CustomCard__">
      <Card
        className={classes.root}
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {props.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

function Dashboard() {
  return (
    <div className="Dashboard__">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CustomCard to="test" title="Create a New Test" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard to="codingTest" title="Create a New Coding Test" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard to="#" title="Take a Sample Test" />
        </Grid>
        <Grid item xs={12} md={8}>
          <CustomCard
            to="#"
            title="Latest Test Results / Completion Status About Candidates Along With Time Taken"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard to="#" title="View Results" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
