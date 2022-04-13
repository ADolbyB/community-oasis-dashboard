import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";

type Props = {
    header: string,
    required: boolean,
    onChange: any,
    fullWidth: boolean,
  }

/**
 * Allows the user to choose a date and time
 * @param {Props} props - Items being insered into component
 * @returns calendarInput
 */
export default function calendarInput(props: Props) {
  return (
    <>
      <Typography component="h2" variant="h6">{props.header}</Typography>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue="2022-05-24T10:30"
        required={props.required}
        fullWidth={props.fullWidth}
        onChange={props.onChange}
        sx={{width: 250}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}
