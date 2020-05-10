import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import { useAuthContext } from '../utils/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import SaleRows from '../components/SaleRows';

export default function SaleEventsTable() {
  const [saleEvents, setSaleEvents] = useState([]);
  const { auth } = useAuthContext();

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
  };

  const getSaleEvents = () => {
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
  };

  useEffect(() => getSaleEvents(), []);

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: '_links.saleRows.href',
      Cell: (row) => <SaleRows saleEvent={row.original} />,
    },
    {
      id: 'created',
      Header: 'Created',
      width: 140,
      accessor: (row) =>
        row.dateTime === null ? (
          ''
        ) : (
          <Moment format="DD/MM/YYYY  HH:mm">{row.created}</Moment>
        ),
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
        minRows={20}
        filterable={false}
        sortable={true}
        className="-striped -highlight"
        data={saleEvents}
        columns={columns}
      />
    </div>
  );
}
