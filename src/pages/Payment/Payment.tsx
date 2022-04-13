// React
import React, {useState, useEffect} from "react";

// Firebase App Config
import app from "../../firebase";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";

// React Firebase Hooks
import {useCollection} from "react-firebase-hooks/firestore";

// Utilities
import {startOfQuarter, lastDayOfQuarter, format} from "date-fns";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";

// MaterialUI
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Alert, AlertTitle} from "@mui/material";

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

const paymentTypes = [
  {
    value: "0",
    label: "Initial Deposit",
  },
  {
    value: "1",
    label: "Quarterly Fee",
  },
];

const cards = [
  {
    value: "visa",
    label: "Visa",
  },
  {
    value: "american",
    label: "American Express",
  },
  {
    value: "mastercard",
    label: "Master Card",
  },
];

/**
 * A web page for payment management.
 * @returns Payment page view.
 */
export default function Payment() {
  const classes = useStyles();
  const [card, setCard] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [userHasNotPaid, setUserHasNotPaid] = useState(false);

  // Get Auth Object
  const {user} = useUserAuth();

  // Set references to documents and collections used here.
  const today = new Date();
  const transactionRef = collection(db, "transactions");
  const userDocRef = doc(db, "users", String(user.uid));

  const quarterStartDate = startOfQuarter(today);
  const quarterEndDate = lastDayOfQuarter(today);

  // Get all transactions for this user in the current fiscal quarter.
  const userTrxsQuery = query(transactionRef,
      where("user", "==", userDocRef),
      where("transaction_type", "==", 1),
      where("date", ">=", quarterStartDate),
      where("date", "<=", quarterEndDate));

  const [snapshot, loading, error] = useCollection(userTrxsQuery);

  useEffect(() => {
    if (snapshot) {
      if (snapshot.empty) {
        setUserHasNotPaid(true);
      } else {
        setUserHasNotPaid(false);
      }
    }
  }, [snapshot]);

  const transactionData = {
    date: serverTimestamp(),
    payment: parseInt(amount),
    transaction_type: parseInt(paymentType),
    user: userDocRef,
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addDoc(transactionRef, transactionData);
  };

  return (
    <MainLayout>
      <div style={{marginBottom: "2vh"}}>
        {userHasNotPaid ?
          <Alert severity="warning">
            <AlertTitle>Awaiting Payment</AlertTitle>
            You have not paid your quarterly maintenance payment for
            this quarter.
            Payment is due by {format(quarterEndDate, "iii, LLLL do yyyy")}.
          </Alert> :
          <Alert severity="success">
            <AlertTitle>Payment Successful</AlertTitle>
            Thank you for submitting your quarterly maintenance payment.
          </Alert>}
      </div>
      <Header title="Make a Payment" />
      <form>
        <Box className={classes.content}>
          <Box className={classes.input}>
            <SelectInput
              items={paymentTypes}
              value={paymentType}
              header="Type of payment*"
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setPaymentType(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <SelectInput
              items={cards}
              value={card}
              header="Card Type*"
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setCard(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Card number*"
              placeholder="4444 4444 4444 4444"
              required={true}
              fullWidth={true}
              onChange={() => {
                return 0;
              }}
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Expiration date*"
              placeholder="MM/YY"
              required={true}
              fullWidth={true}
              onChange={() => {
                return 0;
              }}
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="CVC*"
              placeholder="000"
              required={true}
              fullWidth={true}
              onChange={() => {
                return 0;
              }}
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Payment Amount*"
              placeholder="1500"
              required={true}
              fullWidth={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Note/Memo"
              placeholder="For future me"
              required={false}
              fullWidth={true}
              onChange={ () => {
                return 0;
              }}
            />
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
    </MainLayout >
  );
}
