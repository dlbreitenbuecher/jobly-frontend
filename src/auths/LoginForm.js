import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertMessages from '../common/AlertMessages';

function LoginForm(props) {
  const { initialFormData, login } = props
  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  console.log('login formErrors:', formErrors);
  console.log('login formData:', formData);
  console.log('login username:', formData.username);
  

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }))
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const result = await login(formData)
    if (result.success) {
      history.push('/companies');
    } else {
      setFormErrors(result.errors);
    }
  }
  return (
    <div>
      {formErrors.length
        ? <AlertMessages
            type='danger'
            message={formErrors} 
          />
        : null}

      <form className="LoginForm" onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            id="login-username"
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>

        <div className="form-group">
          <input
            id="login-password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

//TODO: Remove these before deploying
LoginForm.defaultProps = {
  initialFormData: {
    username: "testuser2",
    password: "password"
  }
}

export default LoginForm;