// React
import React, {useState} from "react";

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

  return (
    <MainLayout>
      <Header title="Make a Payment" />
      <form>
        <Box className={classes.content}>
          <Box className={classes.input}>
            <SelectInput
              items={cards}
              value={card}
              header="Type of payment*"
              required={true}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) =>
                  setCard(event.target.value)
              }
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Payment Amount*"
              placeholder="Amount"
              required={true}
              onChange=""
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="Experation date*"
              placeholder="MM/YY"
              required={true}
              onChange=""
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              header="CVC*"
              placeholder="CVC"
              required={true}
              onChange=""
            />
          </Box>
          <Box className={classes.input}>
            <TextInput
              placeholder="Note/Memo"
              header="Note/Memo"
              required={false}
              onChange=""
            />
          </Box>
          <Box className={classes.submit}>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit">
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </form>
    </MainLayout >
  );
}
