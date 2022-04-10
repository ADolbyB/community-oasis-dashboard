// React
import React from "react";

// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    marginTop: 200,
  },
});

/**
 *
 * @returns Loading
 */
export default function Loading() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <CircularProgress size={100} thickness={2}/>
    </Box>
  );
}
