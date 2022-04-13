// React
import React, {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";

// Auth
import {useUserAuth} from "../../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  Timestamp,
} from "firebase/firestore";
import app from "../../../firebase";

// Layout
import MainLayout from "../../../layouts/MainLayout";

// Components
import TextInput from "../../../components/TextInput";
import CalendarInput from "../../../components/CalendarInput";

// Material UI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Init firestore
const db = getFirestore(app);

const useStyles = makeStyles(() => ({
  input: {
    margin: 25,
  },
  questionInput: {
    margin: 15,
    marginLeft: 40,
    width: 800,
  },
  submit: {
    marginTop: 40,
  },
  makeCommitteeBtn: {
    position: "absolute",
    right: 90,
    top: 100,
  },
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function CreateEvent() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<any>(
      Timestamp.fromDate(new Date()).toDate(),
  );
  const {user} = useUserAuth();
  const location = useLocation();
  const arr = location.pathname.split("/");
  const id = arr[2];

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  const eventData = {
    address: address,
    created_by: doc(db, "users", String(user.uid)),
    date_created: serverTimestamp(),
    date_occuring: date,
    description: description,
    title: eventTitle,
    group_id: id,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const eventRef = collection(db, "events");
    await addDoc(eventRef, eventData);
    navigate("/groups");
  };
  return (
    <MainLayout>
      <form>
        <Box>
          <Typography
            component="h2"
            variant="h4"
            align="center">
              Create an Event
          </Typography>
          <Box className={classes.input}>
            <TextInput
              header="Event title"
              placeholder="Reading how to code badly for dummys"
              required={true}
              fullWidth={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setEventTitle(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Description"
              placeholder="Well drink some coffee and do a litte coding
              but it will be poorly."
              fullWidth
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
              }
              required={true}
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Address"
              placeholder="3405 british ln"
              fullWidth
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(event.target.value)
              }
              required={true}
            />
          </Box>
          <Box className={classes.input}>
            <CalendarInput
              header="Date Occuring"
              required={true}
              fullWidth={false}
              onChange={handleDateChange}
            />
          </Box>
          <Box className={classes.submit}>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </form>
    </MainLayout>
  );
}
