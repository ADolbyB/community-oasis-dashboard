// Auth

// React
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    height: 350,
  },
});

/**
 *
 * @return {React}
 */
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    navigate("/my-account");
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
              <Typography variant="h3" component="h1">Oasis Portal</Typography>
              <TextField
                className={classes.inputField}
                onChange={(event) => setEmail(event.target.value)}
                variant="standard"
                label="Email"
                size="small"
                type="email"
                fullWidth
                required
              ></TextField>
              <TextField
                className={classes.inputField}
                onChange={(event) => setPassword(event.target.value)}
                variant="standard"
                label="Password"
                size="small"
                fullWidth
                type="password"
                required
              ></TextField>
            </CardContent>
            <CardActions>
              <Button onClick={handleLogin} variant="contained"
                color="primary" fullWidth>Log In</Button>
            </CardActions>
          </Card>
        </Grid>
      </form>
    </div>
  );
}
