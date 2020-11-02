import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'reactstrap';
import CurrentUserContext from './auths/CurrentUserContext.js'

function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('in HomePage. CurrentUser:', currentUser);
  function renderWelcomeMsgOrButtons() {
    if (currentUser) {
      return (
        <>
          <h3>Welcome Back, {currentUser.username}</h3>
        </>
      )
    } else {
      return (
        <>
          <Link className="btn btn-primary" to="/login"> Log in </Link>
          <Link className="btn btn-primary" to="/signup"> Sign Up</Link>
        </>
      )
    }
  }

  return (
    <div className="HomePage">
      <Jumbotron>
          <h1>Jobly</h1>
          <p>Apply Yourself</p>
          {renderWelcomeMsgOrButtons()}
      </Jumbotron>
    </div>
  )
}

export default HomePage