// React
import React, {useState} from "react";

// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import app from "../firebase";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";

// MaterialUI
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
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
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [code, setCode] = useState("");
  const {user} = useUserAuth();

  const transactionData = {
    date: serverTimestamp(),
    payment: amount,
    transaction_type: parseInt(paymentType),
    user: doc(db, "users", user.uid),
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const transactionRef = collection(db, "transactions",);
    await addDoc(transactionRef, transactionData);
  };
  return (
    <MainLayout>
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
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Expiration date*"
              placeholder="MM/YY"
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="CVC*"
              placeholder="000"
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setCode(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Payment Amount*"
              placeholder="$1500"
              required={true}
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
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setNote(event.target.value)
              }
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
