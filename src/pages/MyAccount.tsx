// React
import React from "react";

// MaterialUI
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";
/**
 * A web page view for account management
 * @returns My account page view
 */
export default function MyAccount() {
  const [value, setValue] = React.useState<Date | null>(null);


  return (
    <MainLayout>
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
