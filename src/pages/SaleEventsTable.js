import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment/moment.js';
import 'moment-timezone';
import { useAuthContext } from '../utils/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import SaleRows from '../components/SaleRows';
import User from '../components/User';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

export default function SaleEventsTable() {
  const classes = useStyles();
  const [saleEvents, setSaleEvents] = useState([]);
  const { auth } = useAuthContext();

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    axios
      .get(
        'https://rbmk-ticketguru-backend.herokuapp.com/api/saleEvents',
        options
      )
      .then((response) => {
        setSaleEvents(response.data._embedded.saleEvents);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ReactTable
        minRows={20}
        filterable={false}
        sortable={true}
        className="-striped -highlight"
        data={saleEvents}
        columns={[
          {
            id: 'created',
            Header: 'Sale Events',
            accessor: (row) =>
              row.created === null
                ? ''
                : moment(row.created).format('DD/MM/YYYY  HH:mm'),
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          },
          {
            Header: 'Sale Rows',
            sortable: false,
            filterable: false,
            accessor: '_links.self.href',
            Cell: (row) => <SaleRows saleRow={row.original} />,
          },
          {
            Header: 'User',
            sortable: false,
            filterable: false,
            accessor: '_links.self.href',
            Cell: (row) => <User saleRow={row.original} />,
          },
        ]}
      />
    </div>
  );
}
