import React, { useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import './NavigationBar.css'
import CurrentUserContext from "../auths/CurrentUserContext";
import { Container } from 'reactstrap';

/**Renders Nav Links based on whether user is loggedin or not
 * 
 * Accepts props:
 * - currentUser -> details about currentUser
 * 
 * If user is loggedIn, renders link to:
 *    -Companies
 *    -Jobs
 *    -Profile
 *    -Logout
 * 
 * Else, renders link to :
 *    -signup
 *    -login
 *
 * And always renders link to:
 *     -jobly
 * 
 * App -> NavBar -> (links)
 */
function NavigationBar({ logout }) {
  const { currentUser } = useContext(CurrentUserContext)
  console.log('in NavBar. CurrentUser:', currentUser);

  function showLoggedinOrSignupNavs() {
    if (!currentUser) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className='nav-item mr-4'>
            <NavLink to="/login" className='nav-link'>login</NavLink>
          </li>
          <li className='nav-item mr-4'>
            <NavLink to="/signup" className='nav-link'>Signup</NavLink>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className='nav-item mr-4'>
            <NavLink to="/companies" className='nav-link'>Companies</NavLink>
          </li>
          <li className='nav-item mr-4'>
            <NavLink to="/jobs" className='nav-link'>Jobs</NavLink>
          </li>
          <li className='nav-item mr-4'>
            <NavLink to="/profile" className='nav-link'>Profile</NavLink>
          </li>
          <li className='nav-item mr-4'>
            <Link onClick={logout} to="/" className='nav-link'>Log out {currentUser.username}</Link>
          </li>
        </ul>
      )
    }
  }

  return (
    <nav className='NavigationBar navbar navbar-expand-md bg-light'>
      <NavLink exact to="/" className='navbar-brand'>
        Jobly
      </NavLink>
      {showLoggedinOrSignupNavs()}
    </nav>
  )
}

export default NavigationBar