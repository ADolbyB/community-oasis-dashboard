
// React
import React, {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import {useDocumentOnce} from "react-firebase-hooks/firestore";
import app from "../../firebase";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";

// Material UI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

// Init firestore
const db = getFirestore(app);

const useStyles = makeStyles(() => ({
  content: {
    marginTop: 30,
  },
  input: {
    margin: 25,
  },
  submit: {
    marginTop: 40,
  },
  description: {
    marginTop: 15,
  },
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function Survey() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [valuesArray, setValuesArray] = useState<Array<string>>([]);
  const {user} = useUserAuth();
  const arr = location.pathname.split("/");
  const id = arr[2];
  const questionareRef = doc(db, "questionares", id);
  const [snapshot, loading, error, reload] = useDocumentOnce(questionareRef);

  const responsesData = {
    answers: valuesArray,
    user: doc(db, "users", String(user.uid)),
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const responsesRef = collection(db, "questionares", id, "responses");
    await addDoc(responsesRef, responsesData);
    navigate("/surveys");
  };

  const handleRadioChange = (
      event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesArray((prevArray: any) => [...prevArray, event.target.value]);
  };

  return (
    <MainLayout>
      <form>
        <Box>
          <Box>
            <Header title={snapshot?.data()?.title} />
            <Typography
              component="h2"
              variant="subtitle1"
              className={classes.description}
            >
              {snapshot?.data()?.description}
            </Typography>
          </Box>
          <Box>
            {snapshot?.data()?.questions
                .map((question: string, index: number) => (
                  <React.Fragment key={index}>
                    <Typography
                      component="h2"
                      variant="body1"
                      className={classes.description}
                    >
                      {question}
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        name={question}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="True"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="False"
                        />
                      </RadioGroup>
                    </FormControl>
                  </React.Fragment>
                ))}
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
