import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de Login', () => {
  test('Testando a tela de Login', () => {
    renderWithRouter(<App />);

    const emailElement = screen.getByTestId('email-input');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByTestId('password-input');
    expect(passwordElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId('login-submit-btn');
    expect(buttonElement).toBeInTheDocument();

    userEvent.type(emailElement, 'email@email.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(buttonElement);
  });
});
