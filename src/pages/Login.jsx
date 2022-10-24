import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

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
    <form onSubmit={ handleClick }>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          type="email"
          name="email"
          onChange={ handleChange }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ handleChange }
          value={ password }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ isDisabledButton }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
