
// React
import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  useDocument,
  useDocumentData,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import app from "../../firebase";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";

// Material UI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

// Init firestore
const db = getFirestore(app);

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles(() => ({
  content: {
    marginTop: 30,
  },
  input: {
    margin: 25,
  },
  submit: {
    marginTop: 40,
  },
  description: {
    marginTop: 15,
  },
  infoBlockBackgroundGrey: {
    background: "#C4C4C4",
    paddingTop: infoBlockVerticalPadding,
    paddingBottom: infoBlockVerticalPadding,
    paddingLeft: 5,
    marginRight: 30,
  },
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function Group() {
  // CSS
  const classes = useStyles();

  // React Route
  const navigate = useNavigate();
  const location = useLocation();
  const arr = location.pathname.split("/");
  const id = arr[2];

  // useState
  const [memberJoined, setMemberJoined] = useState(false);
  const [membersArray, setMembersArray] = useState<Array<any>>();

  // Auth
  const {user} = useUserAuth();

  // Groups Querys
  const groupRef = doc(db, "groups", id);
  const [snapshot, loading, error] = useDocument(groupRef);

  // Group Data Query
  const [
    value,
    loadingData,
    errorData,
    snapshotData,
  ] = useDocumentData(groupRef);

  // Events Query
  const eventsRef = collection(db, "events");
  const eventQuery = query(eventsRef, where("group_id", "==", id));
  const [
    collectionSnapshot,
    collectionLoading,
    collectionError,
  ] = useCollectionOnce(eventQuery);


  const membersData = {
    members: membersArray,
  };

  const handleJoinGroup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tempMembersArray : any[] = snapshot?.data()?.members || [];
    tempMembersArray.push(doc(db, "users/" + String(user.uid)));
    setMembersArray(tempMembersArray);
    await updateDoc(groupRef, membersData);
    navigate("/groups");
  };

  const handleCreateEvent = () => {
    navigate("create-event");
  };

  useEffect(() => {
    const tempMembersArray : any[] = value?.members;
    tempMembersArray?.forEach((member) => {
      if (member.id === user.uid) {
        setMemberJoined(true);
      }
    });
  }, [membersData]);

  /**
   * Button for joining group
   * @returns JoinButton
   */
  function JoinButton() {
    return (
      <Box className={classes.submit}>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinGroup}
            type="submit"
          >
                Join Group
          </Button>
        </Grid>
      </Box>
    );
  }

  /**
   * Allows you to create event
   * @returns CreateEvent
   */
  function Event() {
    return (
      <>
        <Box className={classes.submit}>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateEvent}
              type="submit"
            >
                  Create Event
            </Button>
          </Grid>
        </Box>
        <Box sx={{width: "100%", marginLeft: 15, marginTop: 30}}>
          <Typography variant="h6">Upcoming Events</Typography>
          <Grid container direction="column">
            <Grid item className={classes.infoBlockBackgroundGrey}>
              {collectionSnapshot?.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                    >
                      {doc.data().title}
                    </Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  return (
    <MainLayout>
      <form>
        <Box>
          <Box>
            <Header title={snapshot?.data()?.name} />
            <Typography
              component="h2"
              variant="subtitle1"
              className={classes.description}
            >
              {snapshot?.data()?.description}
            </Typography>
          </Box>
          {memberJoined ? <Event /> : <JoinButton />}
        </Box>
      </form>
    </MainLayout>
  );
}
