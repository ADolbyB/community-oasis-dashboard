// React
import React from "react";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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

/**
 * Page used to report community problem
 * @returns ReportIssue
 */
export default function ReportIssue() {
  const classes = useStyles();
  return (
    <MainLayout>
      <Header title="Report Issue"/>
      <form>
        <Box className={classes.content}>
          <Box className={classes.input}>
            <Typography
              component="h2"
              variant="h6">
                    Your issue is very important to us!*
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Type issue here..."
              multiline
              rows={4}
              fullWidth
              required
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
    </MainLayout>
  );
}
