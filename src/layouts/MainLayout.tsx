// React
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";

// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
} from "firebase/firestore";
import {
  useDocument,
} from "react-firebase-hooks/firestore";
import app from "../firebase";

// Material UI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, createStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import GroupsIcon from "@mui/icons-material/Groups";
import PollIcon from "@mui/icons-material/Poll";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// Init firestore
const db = getFirestore(app);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => createStyles({
  page: {
    width: "100%",
    padding: theme.spacing(4),
    marginLeft: 80,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
  title: {
    padding: theme.spacing(2),
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  bottomPush: {
    position: "fixed",
    bottom: 0,
    paddingBottom: 20,
  },
}));

let tabs = [
  {
    text: "My Account",
    id: "my-account",
    icon: <HomeIcon />,
  },
  {
    text: "Make a Payment",
    id: "payment",
    icon: <PaymentIcon />,
  },
  {
    text: "Groups",
    id: "groups",
    icon: <GroupsIcon />,
  },
  {
    text: "Community Surveys",
    id: "surveys",
    icon: <PollIcon />,
  },
  {
    text: "Report Issue",
    id: "report-issue",
    icon: <ReportProblemIcon />,
  },

];

type Prop = {
    children: JSX.Element | JSX.Element[]
}

/**
 * Used to display the layout to all pages.
 * @param {Prop} prop - displays the contect inside the layout.
 * @returns MainLayout.
 */
export default function MainLayout({children}: Prop) {
  const classes = useStyles();
  const navigate = useNavigate();
  const {user} = useUserAuth();

  // Users Querys
  const userRef = doc(db, "users", String(user.uid));
  const [snapshot, loading, error] = useDocument(userRef);

  useEffect(() => {
    if (snapshot?.data()?.privilege === 1) {
      tabs = [
        {
          text: "My Account",
          id: "my-account",
          icon: <HomeIcon />,
        },
        {
          text: "Make a Payment",
          id: "payment",
          icon: <PaymentIcon />,
        },
        {
          text: "Groups",
          id: "groups",
          icon: <GroupsIcon />,
        },
        {
          text: "Community Surveys",
          id: "surveys",
          icon: <PollIcon />,
        },
        {
          text: "Report Issue",
          id: "report-issue",
          icon: <ReportProblemIcon />,
        },
        {
          text: "Admin",
          id: "admin",
          icon: <AdminPanelSettingsIcon />,
        },
      ];
    }
  });


  return (
    <div className={classes.root}>
      <NavBar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{paper: classes.drawerPaper}}
      >
        <div className={classes.toolbar} />
        <List>
          {tabs.map((tab) => (
            <ListItem
              button
              key={tab.id}
              onClick={() => navigate(`/${tab.id}`)}
            >
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </Box>

    </div>
  );
}
