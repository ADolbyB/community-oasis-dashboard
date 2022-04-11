// React
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  content: {
    marginTop: 30,
  },
  modalSize: {
    marginLeft: 40,
    marginRight: 40,
  },
  input: {
    margin: 25,
  },
  submit: {
    marginTop: 40,
  },
  addBtn: {
    position: "fixed",
    right: 90,
    top: 100,
  },
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function SurveyPopup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [addQuestion, setAddQuestion] = useState(1);
  const [questionArray, setQuestionArray] = useState<Array<any>>([]);

  const handleSubmit = async () => {
    navigate("/surveys");
  };

  useEffect(() => {
    const questionAmountArray : any[] = [];
    for (let i = 0; i < addQuestion; i++) {
      questionAmountArray.push(<Question id={i}/>);
    }
    setQuestionArray(questionAmountArray);
  }, [addQuestion]);

  type Props = {
    id: number,
  }
  /**
   * Question the user fills out
   * @param {Prop} props - Key for the question
   * @returns Question
   */
  function Question(props: Props) {
    return (
      <Box key={props.id}>
        <TextField
          placeholder="Type here..."
          variant="outlined"
          fullWidth
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) =>
              setQuestion(event.target.value)
          }
          required
        />
        <FormControl>
          <RadioGroup
            row
            name="radio-answer-group"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="True"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="False"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }

  return (
    <MainLayout>
      <form>
        <Box className={classes.modalSize}>
          <Typography
            component="h2"
            variant="h4"
            align="center">
              Create a survey
          </Typography>
          <Box className={classes.addBtn}>
            <Button
              onClick={
                () => setAddQuestion(addQuestion + 1)
              }
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              color="secondary"

            >
              Question
            </Button>
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Title"
              placeholder="Greatest Survey"
              required={true}
              fullWidth={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
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
                  setTitle(event.target.value)
              }
              required
            />
          </Box>
          <Box className={classes.input}>
            <Typography component="h2" variant="h6">Questions</Typography>
            {/* eslint-disable-next-line arrow-parens */}
            {questionArray.map(question => (
              question
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
