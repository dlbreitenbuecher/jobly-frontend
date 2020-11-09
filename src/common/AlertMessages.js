import React, { useState } from 'react';
import { Alert } from 'reactstrap';
function AlertMessages({ type = 'danger', messages = [] }) {
  const [visible, setVisible] = useState(true);

  function onDismiss() {
    setVisible(false);
  }

  if (visible) {
    return (
      <Alert color={type} isOpen={visible}>
        {messages.map((message) => (
          <p className="mb-0 small" key={message}>
            {message}
          </p>
        ))}
      </Alert>
    );
  }
}

export default AlertMessages;
