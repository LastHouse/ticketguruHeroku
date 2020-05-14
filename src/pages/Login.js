import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="#">
        TicketGuru
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    username: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    setUser({
      ...user,
      isSubmitting: true,
      errorMessage: null,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: 'jwt',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };

    fetch(
      'https://rbmk-ticketguru-backend.herokuapp.com/api/login',
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        setUser({
          ...user,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
    history.push('/app/eventstable');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInputChange}
            value={user.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            value={user.password}
          />

          {user.errorMessage && (
            <span className="form-error">{user.errorMessage}</span>
          )}

          <Button
            disabled={user.isSubmitting}
            fullWidth
            href="/eventstable"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            {user.isSubmitting ? 'Loading...' : 'Login'}
          </Button>

          <Grid container>
            <Grid item xs>
              <Typography variant="body2" align="center">
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default Login;
