import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertMessages from '../common/AlertMessages';

function LoginForm({ initialFormData, login }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    setFormErrors([]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      history.push('/companies');
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 mt-5">Log In</h3>
        <div className="card text-left">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="login-username">Username</label>
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
                <label htmlFor="login-password">Password</label>
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

              {formErrors.length ? (
                <AlertMessages type="danger" messages={formErrors} />
              ) : null}
              <button className="btn btn-primary btn-block mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

//TODO: Remove these before deploying
LoginForm.defaultProps = {
  initialFormData: {
    username: 'testuser3',
    password: 'password',
  },
};

export default LoginForm;
