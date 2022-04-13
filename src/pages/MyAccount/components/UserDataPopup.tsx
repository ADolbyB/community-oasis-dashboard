// React
import React, {useState} from "react";

// Auth
import {useUserAuth} from "../../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../../../firebase";

// Components
import TextInput from "../../../components/TextInput";

// MaterialUI
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [phone, setPhone] = useState("");
  const {user, updateDisplayName} = useUserAuth();
  const userRef = doc(db, "users", String(user.uid));
  const detailsRef = doc(db, "users", String(user.uid), "private", "details");

  const handleClose = () => {
    setOpen(false);
  };

  const userData = {
    first_name: firstName,
    last_name: lastName,
    privilege: 0,
  };

  const detailsData = {
    address: address,
    gender: gender,
    license_plate: licensePlate,
    phone: parseInt(phone),
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updateDisplayName(firstName, lastName);
    await updateDoc(userRef, userData);
    await updateDoc(detailsRef, detailsData);
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
          <Box className={classes.modalSize}>
            <Typography
              component="h2"
              variant="h4">
                Enter Resident info
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
                header="Gender"
                placeholder="M/F"
                required={true}
                fullWidth={true}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setGender(event.target.value)
                }
              />
            </Box>
            <Box className={classes.input}>
              <TextInput
                header="address"
                placeholder="1051 rollands ave"
                required={true}
                fullWidth={true}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setAddress(event.target.value)
                }
              />
            </Box>
            <Box className={classes.input}>
              <TextInput
                header="Phone"
                placeholder="9232345673"
                required={true}
                fullWidth={true}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(event.target.value)
                }
              />
            </Box>
            <Box className={classes.input}>
              <TextInput
                header="License Plate"
                placeholder="GR56R2"
                required={true}
                fullWidth={true}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setLicensePlate(event.target.value)
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
  );
}
