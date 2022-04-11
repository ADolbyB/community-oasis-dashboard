// React
import React, {useState, useEffect, useRef} from "react";

// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// Firestore
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "../../firebase";

// MaterialUI
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";
import UserDataPopup from "./components/UserDataPopup";

// Init firestore
const db = getFirestore(app);


/**
 * A web page view for account management
 * @returns My account page view
 */
export default function MyAccount() {
  const [value, setValue] = useState<Date | null>(null);
  const [dataPresence, setDataPresence] = useState(false);
  const {user} = useUserAuth();
  const componentMounted = useRef(true);


  useEffect(() => {
    const userRef = doc(db, "users", String(user.uid));
    (async () => {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        if (componentMounted.current) {
          if (userDoc.data().first_name === "") {
            setDataPresence(true);
          }
        }
      }
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);


  return (
    <MainLayout>
      { dataPresence ? <UserDataPopup/> : <span />}
      <div>
        <Header title="My Account" />
        <p>Welcome, if you are a new Resident please Select a date below:</p>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <DatePicker
            label="Select Orientation date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div >
        <p>Upcoming Events:</p>
      </div>
      <div>
        <p>Bus and Carpool information:</p>
      </div>
    </MainLayout>
  );
}
