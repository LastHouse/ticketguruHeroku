import React, { useEffect } from 'react';
import { useAuthContext } from '../utils/AuthContext';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment/moment.js';
import ReadTicket from '../components/ReadTicket';
import TicketStatus from '../components/TicketStatus';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export const TicketContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const initialState = {
  tickets: [],
  isFetching: false,
  hasError: false,
  isTicketSubmitting: false,
  songHasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case 'FETCH_TICKETS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        tickets: action.payload,
      };
    case 'FETCH_TICKETS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case 'PATCH_TICKET_REQUEST':
      return {
        ...state,
        isTicketSubmitting: true,
        songHasError: false,
      };
    case 'PATCH_TICKET_SUCCESS':
      return {
        ...state,
        isTicketSubmitting: false,
        tickets: [...state.tickets, action.payload],
      };
    case 'PATCH_TICKET_FAILURE':
      return {
        ...state,
        isTicketSubmitting: false,
        songHasError: true,
      };
    default:
      return state;
  }
};

export const Tickets = () => {
  const { auth } = useAuthContext();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: 'FETCH_TICKETS_REQUEST',
    });
    fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/tickets', {
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
        console.log(resJson._embedded.tickets);
        dispatch({
          type: 'FETCH_TICKETS_SUCCESS',
          payload: resJson._embedded.tickets,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_TICKETS_FAILURE',
        });
      });
  }, [auth.token]);

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: '_links.self.href',
      Cell: (row) => <ReadTicket ticket={row.original} />,
    },
    {
      Header: 'Checksum',
      accessor: 'checksum',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    {
      id: 'invalid',
      Header: 'Invalidated',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      accessor: (row) =>
        row.invalid === null
          ? ''
          : moment(row.invalid).format('DD/MM/YYYY  HH:mm'),
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: '_links.ticketStatus.href',
      Cell: (row) => <TicketStatus ticket={row.original} />,
    },
  ];

  return (
    <div className={classes.root}>
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <ReactTable
          filterable={false}
          data={state.tickets}
          columns={columns}
          SubComponent={(row) => {
            return (
              <div>
                <Input
                  align="center"
                  type="number"
                  id="quantity"
                  name="quantity"
                  defaultValue="1"
                />
                <Button size="small" variant="contained" color="primary">
                  Testi
                </Button>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default Tickets;
