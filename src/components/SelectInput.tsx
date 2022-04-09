// React
import React from "react";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

type Props = {
    items: any,
    header: string,
    required: boolean,
    value: any,
    onChange: any,
}

/**
 * Select inpuit
 * @param {Props} props - items
 * @returns SelectInput
 */
export default function SelectInput(props: Props) {
  return (
    <FormControl>
      <Typography variant="h6">{props.header}</Typography>
      <TextField
        select
        variant="outlined"
        required={props.required}
        value={props.value}
        onChange={props.onChange}
      >
        {props.items.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
