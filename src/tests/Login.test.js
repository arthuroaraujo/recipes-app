import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando a tela de Login', () => {
  test('Testando a tela de Login', () => {
    render(<App />);

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
