
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
} from "firebase/firestore";
import {useDocument, useDocumentData} from "react-firebase-hooks/firestore";
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

// Init firestore
const db = getFirestore(app);

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
}));

/**
 * Popup to create survey
 * @returns SurveyPopup
 */
export default function Group() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [memberJoined, setMemberJoined] = useState(false);
  const location = useLocation();
  const {user} = useUserAuth();
  const arr = location.pathname.split("/");
  const id = arr[2];
  const groupRef = doc(db, "groups", id);
  const [snapshot, loading, error] = useDocument(groupRef);
  const [
    value,
    loadingData,
    errorData,
    snapshotData,
  ] = useDocumentData(groupRef);
  const [membersArray, setMembersArray] = useState<Array<any>>();

  const membersData = {
    members: membersArray,
  };

  const handleJoinGroup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tempMembersArray : any[] = snapshot?.data()?.members;
    tempMembersArray.push(doc(db, "users/" + user.uid));
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
  function CreateEvent() {
    return (
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
    );
  }

  // console.dir(value?.members[0].id);
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
          {memberJoined ? <CreateEvent /> : <JoinButton />}
        </Box>
      </form>
    </MainLayout>
  );
}
