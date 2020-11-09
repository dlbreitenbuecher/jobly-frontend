import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertMessages from '../common/AlertMessages';


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
function SignupForm({ initialFormData, signup }) {
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      history.push('/companies')
    } else {
      setFormErrors(result.errors);
    }

    // try {
    //   await signup(formData);
    //   history.push('/companies');
    // } catch(err) {
    //   setFormErrors(err);
    // setFormData(initialFormData);
  }


  function renderFormInputs() {
    return (
      Object.keys(initialFormData).map(input => (
        <div className="form-group">
          <label htmlFor={input}>{input}</label>
          <input
            id={`signup-${input}`}
            name={input}
            className="form-control"
            placeholder={input}
            onChange={handleChange}
            value={formData[input]}
            aria-label={input}
          />
        </div>
      ))
    )
  }

  return (
    <div className='SignupForm'>
      <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <h2 className='mb-3 mt-5'>Sign Up</h2>
        <div className='card text-left'>
          <div className='card-body'>
            <form onSubmit={handleSubmit} className='SignupForm'>

              <div className="form-group">
                <label htmlFor='signup-username'>Username</label>
                <input
                  id='signup-username'
                  name='username'
                  className='form-control'
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='signup-password'>Password</label>
                <input
                  type='password'
                  id='signup-password'
                  name='password'
                  className='form-control'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='signup-firstname'>First name</label>
                <input
                  id='signup-firstName'
                  name='firstName'
                  className='form-control'
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlfor='signup-lastname'>Last name</label>
                <input
                  id='signup-lastName'
                  name='lastName'
                  className='form-control'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='signup-email'>Email</label>
                <input
                  type='email'
                  id='signup-email'
                  name='email'
                  className='form-control'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <AlertMessages type='danger' messages={formErrors} />
                : null}

              <button className='btn btn-primary btn-block mt-4'>
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

SignupForm.defaultProps = {
  initialFormData: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
}

export default SignupForm;