import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useAuthContext } from '../utils/AuthContext';

export default function ReadQr() {
  const { auth } = useAuthContext();
  const [state, setState] = useState({
    result: 'No result',
  });

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data,
      });
      validateTicket();
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const validateTicket = () => {
    fetch(
      `https://rbmk-ticketguru-backend.herokuapp.com/api/tickets/validate/${state.result}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: 500 }}
      />
      <h4>{state.result}</h4>
    </div>
  );
}
