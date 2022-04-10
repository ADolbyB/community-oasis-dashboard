// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// React
import React, {useState, useEffect, useRef} from "react";

// Firestore
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import app from "../firebase";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";
import TextInput from "../components/TextInput";

// MaterialUI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles, createStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Init firestore
const db = getFirestore(app);

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles(() => createStyles({
  infoBlockBackgroundGrey: {
    background: "#C4C4C4",
    paddingTop: infoBlockVerticalPadding,
    paddingBottom: infoBlockVerticalPadding,
    paddingLeft: 5,
    marginRight: 30,
  },
  infoBlockBackgroundWhite: {
    paddingTop: infoBlockVerticalPadding,
    paddingBottom: infoBlockVerticalPadding,
    paddingLeft: 5,
    marginRight: 30,
  },
  checklist: {
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
  },
  visitorsList: {
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
  },
  submit: {
    marginTop: 25,
  },
}));

/**
 * Settings page
 * @returns Settings Page
 */
export default function Settings() {
  const {user} = useUserAuth();
  const classes = useStyles();
  const [phone, setPhone] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [visitors, setVisitors] = useState<Array<any>>([]);
  const componentMounted = useRef(true);

  useEffect(() => {
    const detailsRef = doc(db, "users", user.uid, "private", "details");
    (async () => {
      const detailsDoc = await getDoc(detailsRef);
      if (detailsDoc.exists()) {
        if (componentMounted.current) {
          setPhone(detailsDoc.data().phone);
          setAddress(detailsDoc.data().address);
        }
      }
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getVisitorsFromFirebase: Array<any> = [];
    const subscriber = onSnapshot(
        collection(db, "users", user.uid, "visitors"), (snapshot) => {
          snapshot.docs.forEach((doc) => {
            getVisitorsFromFirebase.push({...doc.data(), id: doc.id});
          });
          setVisitors(getVisitorsFromFirebase);
        });
    return () => subscriber();
  }, []);

  const visitorsData = {
    expirationDate: serverTimestamp(),
    first_name: firstName,
    last_name: lastName,
    license_plate: licensePlate,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const visitorsRef = collection(
        db, "users", user.uid, "visitors");
    await addDoc(visitorsRef, visitorsData);
  };

  /**
   * Displays visitors first name
   * @returns VistitorFirstName
   */
  function VisitorFirstName() {
    return (
      <>
        <Grid>
          {/* eslint-disable-next-line arrow-parens*/}
          {visitors.map(visitor => (
            <Typography
              key={visitor.id}
              variant="body1">
              First name: {visitor.first_name}
            </Typography>
          ))}
        </Grid>
      </>
    );
  }

  /**
   * Displays visitors last name
   * @returns VistitorLastName
   */
  function VisitorLastName() {
    return (
      <>
        <Grid>
          {/* eslint-disable-next-line arrow-parens*/}
          {visitors.map(visitor => (
            <Typography
              key={visitor.id}
              variant="body1">
                Last name: {visitor.last_name}
            </Typography>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <MainLayout>
      <Header title="Contact Info" />
      <Box sx={{width: "100%", marginLeft: 15, marginTop: 30}}>
        <Grid container direction="column">
          <Grid item className={classes.infoBlockBackgroundGrey}>
            <Typography
              variant="body1">
                Resident: {user.displayName}
            </Typography>
          </Grid>
          <Grid item className={classes.infoBlockBackgroundWhite}>
            <Typography variant="body1">Email: {user.email}</Typography>
          </Grid>
          <Grid item className={classes.infoBlockBackgroundGrey}>
            <Typography variant="body1">Phone: {phone}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item className={classes.infoBlockBackgroundWhite}>
            <Typography variant="body1">Address: {address}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography
          className={classes.header}
          variant="h6"
          component="h2"
          align="center">
          Create Visitor
        </Typography>
        <Grid container direction="row" justifyContent="center">
          <TextInput
            header=""
            placeholder="First Name"
            required={true}
            fullWidth={false}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(event.target.value)
            }
          />
          <TextInput
            header=""
            placeholder="Last Name"
            required={true}
            fullWidth={false}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(event.target.value)
            }
          />
          <TextInput
            header=""
            placeholder="License Plate"
            required={true}
            fullWidth={false}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) =>
                setLicensePlate(event.target.value)
            }
          />
        </Grid>
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
        <Typography
          className={classes.header}
          variant="h6"
          component="h2"
          align="center">
          Visitors List
        </Typography>
        <Box className={classes.visitorsList}>
          <Grid container spacing={1} justifyContent="center">
            <div style={{display: "inline-flex", marginRight: 15}}>
              <VisitorFirstName />
            </div>
            <div style={{display: "inline-flex", marginRight: 15}}>
              <VisitorLastName />
            </div>
          </Grid>
        </Box>
      </Box>
      <Typography
        className={classes.header}
        variant="h6"
        component="h2"
        align="center">
          Checklist
      </Typography>
      <Box className={classes.checklist}>
        Your ready to go!
      </Box>
    </MainLayout>
  );
}
