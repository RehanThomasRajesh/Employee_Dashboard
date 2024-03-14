import React, { useState } from 'react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    try {
      // Simulate authentication logic on the client side
      if (email === 'admin@123.com' && password === 'admin') {
        console.log('Login successful');
        setErrorMessage('');

        // Redirect to /upload using window.location
        window.location.href = '/upload';
      } else {
        console.error('Login failed');
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  return (
    <section
      className="section section--login"
      style={{
        background: 'linear-gradient(to bottom right, #add8e6, #87cefa)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card login">
              <div className="card-body text-center">
                <figure>
                  <img src="../favicon.ico" alt="Logo" className="img-fluid mb-3" />
                </figure>
                <form onSubmit={handleLogin}>
                  <div className="form-group login__input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group login__input">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <br></br>
                  <button type="submit" className="btn btn-primary btn-block l-btn">
                    Login
                  </button>
                  {errorMessage && <p className="error-message mt-3">{errorMessage}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
