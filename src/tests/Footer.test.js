import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Meals from '../pages/Meals';
import App from '../App';

describe('Testes para o componete footer', () => {
  test('', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'rob@hotmail.com');
    userEvent.type(password, '12345678');
    userEvent.click(submitButton);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
