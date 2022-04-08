//React
import React from 'react'

//MaterialUI
import Typography from '@material-ui/core/Typography'

type Props = {
    title: string
}
export default function Header(props: Props) {
  return (
    <Typography variant="h4">{props.title}</Typography>
  )
}
