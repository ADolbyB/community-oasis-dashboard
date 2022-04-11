// React
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import app from "../../firebase";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import TextInput from "../../components/TextInput";

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
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function CreateSurvey() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const {user} = useUserAuth();

  const questionareData = {
    created_by: doc(db, "users", String(user.uid)),
    created_date: serverTimestamp(),
    description: description,
    questions: [question1, question2, question3, question4],
    tags: "survey",
    title: title,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const questionareRef = collection(db, "questionares");
    await addDoc(questionareRef, questionareData);
    navigate("/surveys");
  };

  return (
    <MainLayout>
      <form>
        <Box>
          <Typography
            component="h2"
            variant="h4"
            align="center">
              Create a survey
          </Typography>
          <Box className={classes.input}>
            <TextInput
              header="Title"
              placeholder="Greatest Survey"
              required={true}
              fullWidth={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Description"
              placeholder="Type here..."
              fullWidth
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
              }
              required={true}
            />
          </Box>
          <Box className={classes.input}>
            <Typography component="h2" variant="h6">Questions</Typography>
            <Typography component="h3" variant="body2">
            </Typography>
          </Box>
          <Box>
            <TextField
              className={classes.questionInput}
              placeholder="Type here..."
              variant="standard"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion1(event.target.value)}
            />
          </Box>
          <Box>
            <TextField
              className={classes.questionInput}
              placeholder="Type here..."
              variant="standard"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion2(event.target.value)}
            />
          </Box>
          <Box>
            <TextField
              className={classes.questionInput}
              placeholder="Type here..."
              variant="standard"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion3(event.target.value)}
            />
          </Box>
          <Box>
            <TextField
              className={classes.questionInput}
              placeholder="Type here..."
              variant="standard"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion4(event.target.value)}
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
