//React
import React from "react";

//MaterialUI
import TextField from "@mui/material/TextField";
import AdapterDatefns from "@mui/lab/AdapterDatefns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

//Layout
import MainLayout from '../layouts/MainLayout'
/**
 * A web page view for account management
 * @returns Web Page View
 */
export default function MyAccount() {
  const [value, setValue] = React.useState<Date | null>(null);


  return (
    <MainLayout>
      <div>
        <h1 className="Accout-Header"> My Account</h1>

        <p>Welcome, if you are a new Resident please Select a date below:</p>

        <LocalizationProvider dateAdapter={AdapterDatefns}>

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
