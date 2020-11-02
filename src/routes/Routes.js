import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from '../HomePage.js';
import CompanyList from '../companies/CompanyList.js';
import CompanyDetail from '../companies/CompanyDetail.js';
import JobCardList from '../jobs/JobCardList.js';
import LoginForm from '../auths/LoginForm.js'
import SignupForm from '../auths/SignupForm.js'
import ProfileForm from '../auths/ProfileForm.js'
import ProtectedRoute from './ProtectedRoute.js';

/** Defines all the routes 
 *  and redirects homepage route if nothing matches 
 * 
 * Protected Routes require a user to be logged in. 
 *    You must be logged in to view pages about companies, jobs, or to 
 *    update your profile
 * 
 * Props :
 *   - signup (for signup form)
 *   - login (for login form)
 *   - updateProfile (for edit profile form)
 * 
 * App -> Routes -> {
 *                    HomePage, CompanyList, 
 *                    CompanyDetail, JobList, 
 *                    LoginForm, SignupForm, 
 *                    ProfileForm
 *                  }
 * */
function Routes({ signup, login, updateProfile }) {

  return (
    <div className="Routes">
      <Switch>

      <Route exact path="/" >
        <HomePage />
      </Route>

      <ProtectedRoute exact path="/companies" >
        <CompanyList />
      </ProtectedRoute>

      <ProtectedRoute exact path="/companies/:companyName" >
        <CompanyDetail />
      </ProtectedRoute>

      <ProtectedRoute exact path="/jobs" >
        <JobCardList />
      </ProtectedRoute>

      <Route exact path="/login" >
        <LoginForm login={login} />
      </Route>

      <Route exact path="/signup" >
        <SignupForm signup={signup}/>
      </Route>

      <ProtectedRoute exact path="/profile" >
        <ProfileForm updateProfile={updateProfile} />
      </ProtectedRoute>

      <Redirect to="/" />

      </Switch>
    </div>
  )
}

export default Routes