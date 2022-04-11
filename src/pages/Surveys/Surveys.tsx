// React
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Firestore
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {useCollectionOnce} from "react-firebase-hooks/firestore";
import app from "../../firebase";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";

// Material UI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Init firestore
const db = getFirestore(app);

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles(() => ({
  createSurveyBtn: {
    position: "absolute",
    right: 90,
    top: 100,
  },
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
}));

/**
 * Surveys page
 * @returns Surveys
 */
export default function Surveys() {
  const navigate = useNavigate();
  const classes = useStyles();
  const surveysRef = collection(db, "questionares");
  const q = query(surveysRef, where("tags", "==", "survey"));
  const [snapshot, loading, error] = useCollectionOnce(q);

  const createSurvey = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("create-survey");
  };


  return (
    <MainLayout>
      <Header title="Surveys" />
      <Button
        variant="contained"
        className={classes.createSurveyBtn}
        color="primary"
        onClick={createSurvey}>
        Create Survey
      </Button>
      <Box sx={{width: "100%", marginLeft: 15, marginTop: 30}}>
        <Grid container direction="column">
          <Grid item className={classes.infoBlockBackgroundGrey}>
            {snapshot?.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <Box>
                  <Link
                    href={`surveys/${doc.id}`}
                    variant="subtitle1"
                    color="inherit"
                  >
                    {doc.data().title}
                  </Link>
                </Box>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
