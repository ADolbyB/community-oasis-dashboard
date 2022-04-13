// React
import React, {useState} from "react";

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
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Init firestore
const db = getFirestore(app);

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
});

/**
 * Page used to report community problem
 * @returns ReportIssue
 */
export default function ReportIssue() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const questionareRef = collection(db, "questionares");
  const {user} = useUserAuth();

  const questionareData = {
    created_by: doc(db, "users", String(user.uid)),
    date_created: serverTimestamp(),
    description: description,
    questions: [question],
    tags: "issue",
    title: title,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addDoc(questionareRef, questionareData);
    window.location.reload();
  };

  return (
    <MainLayout>
      <Header title="Report Issue"/>
      <form>
        <Box className={classes.content}>
          <Box className={classes.input}>
            <Box className={classes.input}>
              <TextInput
                header="Title*"
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
                header="Description*"
                placeholder="Description"
                required={true}
                fullWidth={true}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(event.target.value)
                }
              />
            </Box>
            <Box className={classes.input}>
              <Typography
                component="h2"
                variant="h6"
              >
                What can the community do to help!*
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Type issue here..."
                multiline
                minRows={4}
                fullWidth
                required
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestion(event.target.value)
                }
              />
            </Box>
          </Box>
          <Box className={classes.submit}>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
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
