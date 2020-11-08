import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CurrentUserContext from './auths/CurrentUserContext.js'
import cityScape from './assets/vecteezy_vector-illustration-of-urban-landscape-with-city-skyline-and-building-isolated-on-white-background_655246/city_scape-01.jpg'
import './HomePage.css';

function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('in HomePage. CurrentUser:', currentUser);
  function renderWelcomeMsgOrButtons() {
    if (currentUser) {
      return (
        <div className='HomePage-flex-item'>
          <p className='username'>Welcome Back, {currentUser.username}!</p>
        </div>
      )
    } else {
      return (
        <div>
          <Link className="btn btn-primary font-weight-bold mr-3 HomePage-button" to="/login"> Log in </Link>
          <Link className="btn btn-primary font-weigh-bold HomePage-button" to="/signup"> Sign Up</Link>
        </div>
      )
    }
  }

  // return (
  //   <div className="HomePage">
  //     <div className='HomePage-image'>
  //       <div className='HomePage-welcome container text-center bg-light'>
  //         <div className='text-center pt-5'>
  //         <h1 className='mb-4 font-weight-bold'>Jobly <p className='lead pl-3 d-inline'>Apply Yourself</p></h1>
  //         {renderWelcomeMsgOrButtons()}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )


  return (
    <div className="HomePage">
      <div className='HomePage-image'>
        <div className='HomePage-jumbotron'>
          <div className='HomePage-flex-item'>
            <h1>Jobly</h1>
            <p>Apply Yourself</p>
          </div>
          {renderWelcomeMsgOrButtons()}
          </div>
        </div>
      </div>
  )
}

export default HomePage