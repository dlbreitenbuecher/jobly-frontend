import React from 'react';
import { Spinner } from 'reactstrap';
import './LoadingSpinner.css';


/**Renders a loading spinner */
function LoadingSpinner() {
  return (
    <div className='LoadingSpinner'>
      <Spinner
        color='success'
        style={{ height: '8rem', width: '8rem' }}
      />
    </div>
  )
}

export default LoadingSpinner;