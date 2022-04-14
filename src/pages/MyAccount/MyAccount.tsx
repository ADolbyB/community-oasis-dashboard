// React
import React, {useState, useEffect, useRef} from "react";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  useDocument,
  useDocumentData,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import app from "../../firebase";

// MaterialUI
import TextField from "@mui/material/TextField";
import {makeStyles} from "@material-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";
import UserDataPopup from "./components/UserDataPopup";
import CalendarInput from "../../components/CalendarInput";

// Init firestore
const db = getFirestore(app);

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles({
  content: {
    marginTop: 30,
  },
  input: {
    marginLeft: 30,
    marginTop: 25,
    marginBottom: 25,
  },
  submit: {
    marginTop: 40,
  },
  infoBlockBackgroundGrey: {
    background: "#C4C4C4",
    paddingTop: infoBlockVerticalPadding,
    paddingBottom: infoBlockVerticalPadding,
    paddingLeft: 5,
    marginRight: 30,
  },
});

/**
 * A web page view for account management
 * @returns My account page view
 */
export default function MyAccount() {
  const [dataPresence, setDataPresence] = useState(false);
  const {user} = useUserAuth();
  const componentMounted = useRef(true);
  const classes = useStyles();
  const [date, setDate] = useState<any>(
      Timestamp.fromDate(new Date()).toDate(),
  );

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  // Events Query
  const eventsRef = collection(db, "events");
  const [
    eventsSnapshot,
    eventsLoading,
    eventsError,
  ] = useCollectionOnce(eventsRef);

  // Issues Query
  const issuesRef = collection(db, "questionares");
  const issuesQuery = query(issuesRef, where("tags", "==", "issue"));

  const [
    issuesSnapshot,
    issuesLoading,
    issuesError,
  ] = useCollectionOnce(issuesQuery);

  useEffect(() => {
    const userRef = doc(db, "users", String(user.uid));
    (async () => {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        if (componentMounted.current) {
          if (userDoc.data().first_name === "") {
            setDataPresence(true);
          }
        }
      }
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);


  return (
    <MainLayout>
      { dataPresence ? <UserDataPopup/> : <span />}
      <Header title="My Account" />
      <Box className={classes.content}>
        <Box className={classes.input}>
          <CalendarInput
            header="Orientation Date"
            fullWidth={true}
            onChange={handleDateChange}
            required={false}
          />
        </Box>
        <Box>
          <Typography variant="h6">Upcoming Events</Typography>
          <Grid container direction="column">
            <Grid item className={classes.infoBlockBackgroundGrey}>
              {eventsSnapshot?.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  <Box>
                    <Link
                      // href={`groups/${doc.id}`}
                      variant="subtitle1"
                      color="inherit"
                    >
                      {doc.data().title}
                    </Link>
                  </Box>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6">Community Issues</Typography>
          <Grid container direction="column">
            <Grid item className={classes.infoBlockBackgroundGrey}>
              {issuesSnapshot?.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  <Box>
                    <Link
                      // href={`groups/${doc.id}`}
                      variant="subtitle1"
                      color="inherit"
                    >
                      {doc.data().title}
                    </Link>
                  </Box>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
}
