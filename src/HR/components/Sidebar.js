import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PaymentIcon from "@material-ui/icons/Payment";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./../css/Sidebar.scss";
import SessionData from "./SessionData";
import { HRUserDetailsAPI } from '../API/APIService'

import logo from '../Images/logo.png'

const axios = require("axios");

const drawerWidth = 240;
console.log("working well 001 -------");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  console.log("working well 002 -------");
  // set the defaults
  const [TDATA, setTDATA] = useState({
    id: 0,
    plan: "",
    email: "",
    schoolName: "",
    mobileNumber: "",
    password: "",
    credits: 0,
    signedUpAt: "",
  });
  useEffect(() => {
    let TeacherID = sessionStorage.getItem("token_hr");
    let decoded = atob(atob(atob(TeacherID)));
    console.log("decoded: ", decoded);

    axios.get(`${HRUserDetailsAPI}/${decoded}/`).then((res) => {
      setTDATA(res.data);
    })
  }, []);
  const value = { TDATA, setTDATA };
  const logout = () => {
    sessionStorage.clear();
  };
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} id="navbar__emailDisplay">
        <img src={logo} />
      </div>
      <Divider />
      <List className="navList">
        <Link to="dashboard">
          <ListItem button key="Profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>

        <Link to="/hr/candidate/finder">
          <ListItem button key="Candidate Finder">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Candidate Finder" />
          </ListItem>
        </Link>

        <Link to="#">
          <ListItem button key="Payments">
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </Link>
        <Link to="analytics">
          <ListItem button key="Analytics">
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </Link>
        <Link to="#">
          <ListItem button key="Settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <Link to="#">
          <ListItem button key="Add Credits">
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Credits" />
          </ListItem>
        </Link>
        <Link onClick={logout}>
          <ListItem button key="Logout">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <SessionData.Provider value={value}>
      <div className="Sidebar__">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {props.name}
              </Typography>
              <Typography
                variant="h6"
                noWrap
                style={{
                  position: "absolute",
                  right: "0",
                  marginRight: "24px",
                }}
              >
                Credits : {TDATA.credits}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </div>
      </div>
    </SessionData.Provider>
  );
}
export default ResponsiveDrawer;
