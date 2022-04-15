// React
import React, {useState} from "react";

// Auth
import {useUserAuth} from "../../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  addDoc,
  collection,
} from "firebase/firestore";
import app from "../../../firebase";

// MaterialUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

// Components
import TextInput from "../../../components/TextInput";

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
  createUserBtn: {
    position: "absolute",
    right: -930,
  },
}));

/**
 * Pop up for editing user
 * @returns Edit Modal
 */
export default function CreateUserPopup() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signUp} = useUserAuth();
  const userRef = collection(db, "users");
  // const detailsRef = doc(db, "users", props.id, "private", "details");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const userData = {
    first_name: firstName,
    last_name: lastName,
    privilege: 0,
  };

  const handleSubmit = async (
      e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await signUp(email, password);
    await addDoc(userRef, userData);
    await handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        className={classes.createUserBtn}
        color="secondary"
      >
        Create User
      </Button>
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
            <Box className={classes.modalSize}>
              <Typography
                component="h2"
                variant="h4">
                Create User
              </Typography>
              <Box className={classes.input}>
                <TextInput
                  header="First name"
                  placeholder="Type here.."
                  required={true}
                  fullWidth={true}
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
                  fullWidth={true}
                  onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                      setLastName(event.target.value)
                  }
                />
              </Box>
              <Box className={classes.input}>
                <TextInput
                  header="Email"
                  placeholder="test@test.com"
                  required={true}
                  fullWidth={true}
                  onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                  }
                />
              </Box>
              <Box className={classes.input}>
                <TextInput
                  header="Password"
                  placeholder="*******"
                  required={true}
                  fullWidth={true}
                  onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                  }
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
        </div>
      </Modal>
    </>
  );
}
