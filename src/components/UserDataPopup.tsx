// React
import React, {useState} from "react";

// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../firebase";

// Components
import TextInput from "./TextInput";

// MaterialUI
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Init firestore
const db = getFirestore(app);

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
  input: {
    margin: 25,
  },
  submit: {
    marginTop: 40,
  },
}));

/**
 * Used to get initial user data
 * @returns UserDataPopup
 */
export default function UserDataPopup() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {user} = useUserAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const docData = {
    first_name: firstName,
    last_name: lastName,
    privilege: 0,
  };

  const handleInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, docData);
    await handleClose();
  };
  return (
    <Modal
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <form>
          <Box className={classes.input}>
            <TextInput
              header="First name"
              placeholder="Type here.."
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Last name"
              placeholder="Type here..."
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(event.target.value)
              }
            />
          </Box>
          <Box className={classes.submit}>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleInfo}
                type="submit"
              >
                      Submit
              </Button>
            </Grid>
          </Box>
        </form>
      </div>
    </Modal>
  );
}
