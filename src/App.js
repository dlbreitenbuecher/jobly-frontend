import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import Routes from './routes/Routes';
import NavigationBar from './nav/NavigationBar';
import CurrentUserContext from './auths/CurrentUserContext';
import JoblyApi from './apis/JoblyAPI';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from './common/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Key name for storing token in localStorage in case page refreshes
export const TOKEN_STORAGE_ID = 'jobly-token';

/** Jobly App
 *
 * State :
 *  - currentUser:
 *      User obj from API. Once retrieved, it is stored in context (CurrentUserContext).
 *      Read by other components to see if user is logged in
 *        { username, firstName, lastName, isAdmin, applications }
 *          where applications is [jobID,...]
 *
 * - applicationID:
 *      Current user applications
 *        (Set) [jobID,...]
 *
 *  - token:
 *      Authentication JWT received when a user logs in / signs up
 *      Required for most API calls. When a user logs in or signs up, token is saved
 *      to local storage in case the page refreshes
 *
 *  - infoLoaded:
 *      Manages the loading spinner
 *
 * App -> { NavBar, Routes }
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIDs, setApplicationIDs] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [token, setToken] = useState(storedToken || null);
  // const storedToken = localStorage.getItem('token')

  // runs after first render and when token changes
  useEffect(
    function fetchUserOnTokenChange() {
      async function fetchUser() {
        if (token) {
          try {
            const payload = decode(token);
            JoblyApi.token = token;
            const user = await JoblyApi.getUser(payload.username);
            setCurrentUser(user);
            setApplicationIDs(new Set(user.applications));
          } catch (errors) {
            console.error('Error loading the user!', errors);
            setCurrentUser(null);
          }
        }
        // loading spinner will not render
        setInfoLoaded(true);
      }

      // sets infoLoaded to false - this renders the loading spinner as fetchUser runs
      // once fetchUser finishes running, the loading spinner will not be present after
      // the rerender triggered by fetchUser
      setInfoLoaded(false);
      fetchUser();
    },
    [token],
  );

  /** Signs user up
   *
   * Upon signup, the user's token is saved both to the JoblyAPI class and
   * local storage (see the useEffect above). Therefore, the user is treated as being
   * logged in on sign up is successful
   */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.registerUser(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Signup Unsuccessful!', errors);
      return { success: false, errors };
    }
  }

  /**Logs user in
   *
   * Upon login, user's token is saved both to the JoblyAPI class
   * and local storage
   */
  async function login(loginData) {
    try {
      const token = await JoblyApi.loginUser(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Login Unsuccessful!', errors);
      return { success: false, errors };
    }
  }

  /**Updates a user's profile */
  async function updateProfile(updateData) {
    try {
      const user = await JoblyApi.updateUser(
        currentUser.username,
        updateData,
      );
      setCurrentUser(user);
      return { success: true };
    } catch (errors) {
      console.error('User Profile Update Unsuccessful!', errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  /**Returns true if jobID is in applicationID state. Otherwise returns false */
  function hasApplicationID(jobID) {
    return applicationIDs.has(jobID);
  }

  /**Apply to job. Updates DB in backend through joblyAPI and updates applicationIDs state */
  async function applyToJob(jobID) {
    if (hasApplicationID(jobID)) return;

    try {
      await JoblyApi.applyForJob(currentUser.username, jobID);
      setApplicationIDs(new Set([...applicationIDs, jobID]));
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          hasApplicationID,
          applyToJob,
        }}
      >
        <div className="App">
          <NavigationBar logout={logout} />
          <Routes
            signup={signup}
            login={login}
            updateProfile={updateProfile}
          />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
