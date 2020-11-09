import React from 'react';
import { Alert } from 'reactstrap';

function AlertMessages({ type = 'danger', messages = [] }) {
  return (
    <Alert color={type}>
      {messages.map((message) => (
        <p className="mb-0 small" key={message}>
          {message}
        </p>
      ))}
    </Alert>
  );
}

export default AlertMessages;
