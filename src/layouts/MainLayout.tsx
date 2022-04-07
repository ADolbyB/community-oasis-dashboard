//React
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from "./components/NavBar";

//Material UI
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { Container, makeStyles, createStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const drawerWidth = 240

const useStyles = makeStyles((theme) => createStyles({
        page: {
            width: '100%',
            padding: theme.spacing(4),
            marginLeft: 120
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#FBFAF5',
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            zIndex: theme.zIndex.drawer + 1
        },
        toolbar: theme.mixins.toolbar,
        bottomPush: {
            position: "fixed",
            bottom: 0,
            paddingBottom: 20
        }
}))

const tabs = [
    {
        text: 'My Account',
        id: 'my-account'
    },
    {
        text: 'Make a Payment',
        id: 'make a payment'
    },
    {
        text: 'Groups',
        id: 'groups'
    },
    {
        text: 'Community Surveys',
        id: 'community-serveys'
    },

]

type Prop = {
    children: JSX.Element|JSX.Element[]
  }

export default function ProfileSideNav({children}: Prop) {
    const classes = useStyles()
    const navigate = useNavigate();

    return (
        <div className={classes.root}>
            <NavBar/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.toolbar} />
                <List>
                    {tabs.map(tab => (
                        <ListItem
                            button
                            key={tab.id}
                            //onClick={() => navigate(item.path)}
                            //className={location.pathname === item.path ? classes.active : null}
                        >
                            {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                            <ListItemText primary={tab.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Container className={classes.page}>
            <Grid container>
                <Grid item>
                    <div className={classes.toolbar} />
                    {children}
                </Grid>
            </Grid>
            </Container>

        </div>
    );
}
