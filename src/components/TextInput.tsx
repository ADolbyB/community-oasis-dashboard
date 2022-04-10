// React
import React from "react";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

type Props = {
  placeholder: string,
  header: string,
  required: boolean,
  onChange: any,
}

/**
 * Used as textfield
 * @param {Props} props - placeholder,
 * @returns Textinput
 */
export default function TextInput(props: Props) {
  return (
    <>
      <Typography component="h2" variant="h6">{props.header}</Typography>
      <TextField
        placeholder={props.placeholder}
        variant="outlined"
        fullWidth
        onChange={props.onChange}
        required={props.required}
      />
    </>

  );
}
