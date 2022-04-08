// Auth
import {useUserAuth} from "../contexts/UserAuthContext";

// React
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Link from "@material-ui/core/Link"

// Layout
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
  inputField: {
    marginTop: 5,
    marginBottom: 30,
  },
  loginCard: {
    width: 400,
    height: 500,
  },
});

/**
 * A login page view, routes to other components.
 * @returns Login Page
 */
export default function Signup() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, updateDisplayName } = useUserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      await updateDisplayName(firstName, lastName);
      navigate("/my-account");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`Unexpected Error: ${error}`);
      }
    }
  };

  return (
    <div>
      <form>
        {error}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{minHeight: "100vh"}}
        >
          <Card
            className={classes.loginCard}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h3" component="h1" align="center">Sign up</Typography>
              <TextField
                className={classes.inputField}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                variant="standard"
                label="First Name"
                size="small"
                type="text"
                fullWidth
                required
              ></TextField>
              <TextField
                className={classes.inputField}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                variant="standard"
                label="Last Name"
                size="small"
                type="text"
                fullWidth
                required
              ></TextField>
              <TextField
                className={classes.inputField}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                variant="standard"
                label="Email"
                size="small"
                type="email"
                fullWidth
                required
              ></TextField>
              <TextField
                className={classes.inputField}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                variant="standard"
                label="Password"
                size="small"
                fullWidth
                type="password"
                required
              ></TextField>
            </CardContent>
            <CardActions>
              <Button onClick={handleSignup} variant="contained" color="secondary" fullWidth>Create Account</Button>
            </CardActions>
            <CardActions>
              <Link href="/">Already have an account? Login</Link>
            </CardActions>
          </Card>
        </Grid>
      </form>
    </div>
  );
}