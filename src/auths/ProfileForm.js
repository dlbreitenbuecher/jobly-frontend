import React, { useState, useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import AlertMessages from '../common/AlertMessages';
import { useHistory } from 'react-router-dom';


/**Display signup Form
 * 
 * Props:
 * -initial form data
 * - signup (provides formData to parent to register user)
 * -TODO: setCurrentUser Context?
 * 
 * State:
 * - formData
 * 
 * App -> Route (/signup) -> SignupForm
 */
function ProfileForm({ updateProfile }) {
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  let initialFormData = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: ''
  }

  // console.log("initial data", initialFormData)
  const [formData, setFormData] = useState(initialFormData);//Runs only once


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
    setFormErrors([]);
    setFormSuccess(false);
  }

  // console.log('formData', formData);
  async function handleSubmit(evt) {
    evt.preventDefault();

    const result = await updateProfile(formData);

    if (result.success) {
      setFormSuccess(true);
    } else {
      setFormErrors(result.errors);
      return;
    }
    // the current user context is updated in the updateProfile fn in App.js 
    setFormData({...formData, 'password': ''});
    setFormErrors([]);
  }

  return (
    <div>

      {formErrors.length
        ? <AlertMessages type='danger' messages={formErrors} />
        : null}

      {formSuccess
        ? <AlertMessages type='success' messages={['Profile updated successfully!']} />
        : null}

      <form onSubmit={handleSubmit} className='SignupForm'>
        <div className='form-group'>
          <label>Username</label>
          <p>{currentUser.username}</p>
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-firstName`}>First Name</label>
          <input
            id={`Profile-firstName`}
            name='firstName'
            className="form-control"
            onChange={handleChange}
            value={formData.firstName}
            aria-label='firstName'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-lastName`}>Last Name</label>
          <input
            id={`Profile-lastName`}
            name='lastName'
            className="form-control"
            onChange={handleChange}
            value={formData.lastName}
            aria-label='lastName'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-email`}>Email</label>
          <input
            id={`Profile-email`}
            name='email'
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            aria-label='email'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-password`}>Confirm Password to Make Changes</label>
          <input
            id={`Profile-password`}
            name='password'
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            aria-label='email'
          />
        </div>

        <button>Save changes</button>
      </form>
    </div>
  )
}

export default ProfileForm;