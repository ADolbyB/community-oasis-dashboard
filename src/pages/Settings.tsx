// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// React
import React from "react";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";

// MaterialUI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles, createStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles((theme) => createStyles({
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
    borderRadius: 15,
  },
}));

export default function Settings() {
  const {user} = useUserAuth();
  const classes = useStyles();

  return (
    <MainLayout>
      <Header title="Contact Info" />
      <Box sx={{width: "100%", marginLeft: 15, marginTop: 30}}>
        <Grid container direction="column">
          <Grid item className={classes.infoBlockBackgroundGrey}>
            <Typography variant="body1">Resident: {user.displayName}</Typography>
          </Grid>
          <Grid item className={classes.infoBlockBackgroundWhite}>
            <Typography variant="body1">Email: {user.email}</Typography>
          </Grid>
          <Grid item className={classes.infoBlockBackgroundGrey}>
            <Typography variant="body1">Phone: 555-555-5555</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item className={classes.infoBlockBackgroundWhite}>
            <Typography variant="body1">Address: 123 Oasis Lane</Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6" component="h2" align="center">Checklist</Typography>
      <Box sx={{width: "100%", marginTop: 30}} className={classes.checklist}>
        Your ready to go!
      </Box>
    </MainLayout>
  );
}
