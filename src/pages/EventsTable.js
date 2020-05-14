import React, { useContext } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import EventTickets from '../components/EventTickets';
import CssBaseline from '@material-ui/core/CssBaseline';
import { EventsContext } from '../utils/EventsContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

export default function EventsTable() {
  const classes = useStyles();
  const [events, setEvents] = useContext(EventsContext);

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: '_links.self.href',
      Cell: (row) => <EventTickets event={row.original} />,
    },
    {
      Header: 'Name',
      accessor: 'name',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    {
      id: 'date',
      Header: 'Date',
      accessor: (row) =>
        row.dateTime === null ? (
          ''
        ) : (
          <Moment format="DD/MM/YYYY  HH:mm">{row.dateTime}</Moment>
        ),
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    {
      Header: 'Info',
      accessor: 'info',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ReactTable
        minRows={15}
        filterable={false}
        className="-striped -highlight"
        data={events}
        columns={columns}
      />
    </div>
  );
}
