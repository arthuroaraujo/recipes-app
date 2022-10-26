import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testes para o componete footer', () => {
  test('', () => {
    renderWithRouter(<App />);
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
