import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from './auths/CurrentUserContext.js';
import './HomePage.css';

function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('in HomePage. CurrentUser:', currentUser);
  function renderWelcomeMsgOrButtons() {
    if (currentUser) {
      return (
        <div className='HomePage-flex-item'>
          <p className='HomePage-username'>
            Welcome Back, {currentUser.username}!
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            className='btn btn-primary font-weight-bold mr-3 HomePage-button'
            to='/login'
          >
            Log in
          </Link>
          <Link
            className='btn btn-primary font-weight-bold HomePage-button'
            to='/signup'
          >
            Sign up
          </Link>
        </div>
      );
    }
  }

  return (
    <div className='HomePage'>
      <div className='HomePage-image'>
        <div className='HomePage-jumbotron'>
          <div className='HomePage-flex-item'>
            <h1>Jobly</h1>
            <p className='font-italic lead'>Apply Yourself</p>
          </div>
          {renderWelcomeMsgOrButtons()}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
