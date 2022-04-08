// React
import React from "react";

// MaterialUI
import Typography from "@material-ui/core/Typography";

type Props = {
    title: string
}
/**
 * Header component for pages in application.
 * @param {Props} props - Used to insert the title into the header
 * @returns Header.
 */
export default function Header(props: Props) {
  return (
    <Typography variant="h4">{props.title}</Typography>
  );
}
