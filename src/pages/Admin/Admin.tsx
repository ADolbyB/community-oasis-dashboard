// React
import React, {useState, useEffect} from "react";

// Firestore
import {
  getFirestore,
  doc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import app from "../../firebase";

// MaterialUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@material-ui/core/styles";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import EditUserPopup from "./components/EditUserPopup";
import CreateUserPopup from "./components/CreateUserPopup";

// Init firestore
const db = getFirestore(app);

const infoBlockVerticalPadding = 10;

const useStyles = makeStyles(() => ({
  content: {
    marginTop: 30,
  },
  inputListItem: {
    marginRight: 25,
  },
  buttonListItem: {
    margin: 40,
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
 * A web page view for account management
 * @returns My account page view
 */
export default function MyAccount() {
  const classes = useStyles();
  const [users, setUsers] = useState<Array<any>>([]);

  const handleDeleteUser = async (id: any) => {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    window.location.reload();
  };

  useEffect(() => {
    const getUsersFromFirebase : any[] = [];
    const subscriber = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        getUsersFromFirebase.push({...doc.data(), id: doc.id});
      });
      setUsers(getUsersFromFirebase);
    });
    return () => subscriber();
  }, []);

  return (
    <MainLayout>
      <Typography variant="h4" display="inline">Admin</Typography>
      <CreateUserPopup />
      <Box className={classes.content}>
        <Typography variant="h6">Users</Typography>
        <Grid container direction="column">
          <Grid item className={classes.infoBlockBackgroundGrey}>
            {users.map((doc) => (
              <React.Fragment key={doc.id}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.inputListItem}
                  >
                    Resident: {doc.first_name} {doc.last_name}
                  </Typography>
                  <div>
                    <EditUserPopup id={doc.id} />
                    <Button
                      variant="contained"
                      onClick={
                        () => {
                          handleDeleteUser(doc.id);
                        }
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
