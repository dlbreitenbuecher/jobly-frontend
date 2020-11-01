import React, { useState } from 'react';
import { Alert, Button } from 'reactstrap';

function AlertMessages({ type = 'danger', messages = [] }) {
  const [visible, setVisible] = useState(true);

  function onDismiss() {
    setVisible(false);
  }

  if (visible) {
    return (
      <Alert
        color={type}
        isOpen={visible}
        toggle={onDismiss}
        dismissable='true'
      >
        {messages.map(message => (
          <p className='mb-0 small' key={message}>
            {message}
          </p>
        ))}
      </Alert>
    )
  }

  return (
    <Button 
      onClick={() => setVisible(true)}
      className='m-3'
    >
      Show Alerts
    </Button>
  )
}

export default AlertMessages;