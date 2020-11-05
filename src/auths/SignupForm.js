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
    const {name, value} = evt.target;
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
    return(
      Object.keys(initialFormData).map(input => (
        <div className="form-group">
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
    <div>
      {formErrors.length
        ? <AlertMessages type='danger' messages={formErrors} />
        : null}
        
      <form onSubmit={handleSubmit} className='SignupForm'>
        {renderFormInputs()}
        <button>Submit</button>
      </form>
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