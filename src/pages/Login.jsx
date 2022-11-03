import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const { email,
    setEmail,
    password,
    setPassword,
    isDisabledButton,
    setIsDisabledButton } = useContext(AppContext);

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') {
      setEmail(value);
    } if (name === 'password') {
      setPassword(value);
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const verifyEmail = emailRegex.test(email);
    const number = 5;
    const verifyPassword = password.length > number;
    setIsDisabledButton(!(verifyEmail && verifyPassword));
  };

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="form-login-container">
      <form onSubmit={ handleClick } className="form-login">
        <h2 className="title">Login</h2>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          onChange={ handleChange }
          value={ email }
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ handleChange }
          value={ password }
          placeholder="Password"
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ isDisabledButton }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
