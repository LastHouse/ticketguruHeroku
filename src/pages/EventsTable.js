import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import EventType from '../components/EventType';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from '../utils/AuthContext';
//import Button from '@material-ui/core/Button';
//import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    textAlign: 'left',
  },
}));

export default function EventsTable() {
  const [events, setEvents] = useState([]);
  //const [eventTickets, setEventTickets] = useState([]);
  //const [eventTypes, setEventTypes] = useState([]);
  const classes = useStyles();
  const { auth } = useAuthContext();
  const [links, setLinks] = useState([]);

  // -------------------------------------------------------

  useEffect(() => {
    const fetchEvents = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())

        .then((data) => setEvents(data._embedded.events))

        /*  .then((events) => {
          return Promise.all(events.map((event) => fetch(event._links)));
        })

        .then((response) => response.json()) */

        .catch((err) => console.error(err));
    };
    fetchEvents();
  }, [auth.token]);

  events.map((event) => {
    return console.log(event._links.self);
  });

  // -------------------------------------------------------

  useEffect(() => {
    const fetchVenue = () => {
      fetch('event._links.self.self?/venue', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())

        .then((data) => setLinks(data))

        .catch((err) => console.error(err));
    };
    fetchVenue();
  }, [auth.token]);

  links.map((venue) => {
    return console.log(venue.name);
  });

  // -------------------------------------------------------

  /* useEffect(() => {
    const fetchEventData = async () => {
      const eventTypeAPI = events._links.eventType.href;
      const eventOrganizerAPI = events._links.eventType.href;
      const venueAPI = events._links.eventType.href;
      const ageLimitAPI = events._links.eventType.href;
      const eventTicketsAPI = events._links.eventType.href;

      const getEventTypes = axios.get(eventTypeAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const getEventOrganizers = axios.get(eventOrganizerAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const getVenue = axios.get(venueAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const getAgeLimit = axios.get(ageLimitAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const getEventTickets = axios.get(eventTicketsAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      await axios
        .all([
          getEventTypes,
          getEventOrganizers,
          getVenue,
          getAgeLimit,
          getEventTickets,
        ])
        .then(
          axios.spread((...responses) => {
            const responsesEvents = responses[0].data._embedded.events;
            const responsesEventTickets =
              responses[1].data._embedded.eventTickets;
            const responsesEventTypes = responses[2].data._embedded.eventTypes;

            setEvents(responsesEvents);
            setEventTickets(responsesEventTickets);
            setEventTypes(responsesEventTypes);
          })
        )
        .catch((errors) => {
          console.error(errors);
        });
    };
    fetchEventData();
  }, [auth.token, links]); */

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: '_links.self.href',
      Cell: (row) => <EventType event={row.original} />,
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
      Header: 'Ticket Capacity',
      accessor: 'ticketCapacity',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    /*  {
      Header: 'Info',
      accessor: 'info',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    }, */
    {
      Header: '',
      accessor: '_links.self.href',
      Cell: (row) => <EventType event={row.original} />,
    },
  ];

  return (
    <div className={classes.root}>
      <ReactTable
        expandedRows={true}
        resizable={false}
        minRows={10}
        filterable={false}
        className="-striped -highlight"
        data={events}
        columns={columns}
        /* SubComponent={(row) => {
          return (
            <div>
              <div
                style={{
                  padding: '20px',
                  textAlign: 'left',
                }}
              >
                Price: {eventTickets[row.index].price}
                <br></br>
                <br></br>
                Info: {events[row.index].info}
                <br></br>
                <br></br>
                Event category: {eventTypes[row.index].name}
                <br></br>
                <br></br>
                <Button size="small" variant="outlined" color="secondary">
                  Buy
                </Button>
              </div>
            </div>
          );
        }} */
      />
    </div>
  );
}
