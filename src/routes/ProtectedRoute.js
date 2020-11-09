import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../auths/CurrentUserContext';

/**Ensure only logged in users can access certain routes
 *
 * When a user is logged in, their user object is stored in CurrentUserContext
 * This higher order route component checks to see if there is a user object
 * stored in context.
 *    If a user object is stored in CurrentUserContext:
 *        requested route and child component(s) are rendered
 *    If the value of CurrentUserContext is null:
 *        redirect to login form occurs
 *
 * Routes -> ProtectedRoute -> ChildComponent or LoginForm
 */

function ProtectedRoute({ exact, path, children }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default ProtectedRoute;
