import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import EventTickets from '../components/EventTickets';
import { useAuthContext } from '../utils/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function EventsTable() {
  const [events, setEvents] = useState([]);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEvents = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded.events))
        .catch((err) => console.error(err));
    };
    fetchEvents();
  }, [auth.token]);

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
      width: 220,
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    {
      id: 'date',
      Header: 'Date',
      width: 140,
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
    <div>
      <CssBaseline />
      <ReactTable
        minRows={5}
        filterable={false}
        className="-striped -highlight"
        data={events}
        columns={columns}
      />
    </div>
  );
}
