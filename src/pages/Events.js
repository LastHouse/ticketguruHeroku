import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import 'moment-timezone';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useAuthContext } from '../utils/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  text: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    elevation: 0,
    spacing: 4,
    alignContent: 'stretch',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const initialState = {
  events: [],
  isFetching: false,
  hasError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EVENTS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        events: action.payload,
      };
    case 'FETCH_EVENTS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const Events = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const classes = useStyles();
  const { auth } = useAuthContext();

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_EVENTS_REQUEST',
    });
    fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        //console.log(resJson._embedded.events);
        dispatch({
          type: 'FETCH_EVENTS_SUCCESS',
          payload: resJson._embedded.events,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_EVENTS_FAILURE',
        });
      });
  }, [auth.token]);

  return (
    <div className="events">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <div className={classes.text}>
          <h2>Events</h2>
        </div>
        <Divider />

        {state.isFetching ? (
          <div className="loader">LOADING...</div>
        ) : state.hasError ? (
          <div className="error">AN ERROR HAS OCCURED</div>
        ) : (
          <>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Ticket Capacity</TableCell>
                    <TableCell align="center">Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.events.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center" component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell align="center">
                        <Moment format="DD/MM/YYYY  HH:mm">
                          {row.dateTime}
                        </Moment>
                      </TableCell>
                      <TableCell align="center">{row.ticketCapacity}</TableCell>
                      <TableCell align="center">{row.info}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </div>
  );
};
export default Events;
