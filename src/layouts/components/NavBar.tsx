// Auth
import {useUserAuth} from "../../contexts/UserAuthContext";

// React
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => {
  return {
    btn: {
      color: "white",
    },
    btnBox: {
      marginLeft: 40,
    },
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
    },

  };
});

/**
 * Navbar displayed at top of every page
 * @returns NavBar
 */
export default function NavBar() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [error, setError] = useState("");
  const {logOut, user} = useUserAuth();


  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`Unexpected Error: ${error}`);
      }
    }
  };

  const handleSettings = () => {
    setError("");
    try {
      navigate("/settings");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`Unexpected Error: ${error}`);
      }
    }
  };
  return (
    <AppBar
      position="absolute"
      className={classes.appbar}
      style={{background: "#3A3B3C"}}>
      <Toolbar >
        <Typography
          noWrap
          component="div"
        >
          Oasis retirement community
        </Typography>
        <Box
          className={classes.btnBox}
          sx={{flexGrow: 15, display: {xs: "none", md: "flex"}}} />
        <Box sx={{flexGrow: 0}}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={user.displayName} src="#" />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Button onClick={handleLogout}>Logout</Button>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Button onClick={handleSettings}>Settings</Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
