// React
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// Auth
import {useUserAuth} from "../../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import app from "../../../firebase";

// Layout
import MainLayout from "../../../layouts/MainLayout";

// Components
import TextInput from "../../../components/TextInput";

// Material UI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const {user} = useUserAuth();

  const groupData = {
    address: address,
    description: description,
    group_owner: doc(db, "users", String(user.uid)),
    name: groupName,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const groupRef = collection(db, "groups");
    await addDoc(groupRef, groupData);
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
              header="Group Name"
              placeholder="Brainiac book club"
              required={true}
              fullWidth={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setGroupName(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Description"
              placeholder="A group that pretends to
              read and watches the movies instead!"
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
