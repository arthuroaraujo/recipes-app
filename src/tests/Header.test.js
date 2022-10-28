import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando o Header', () => {
  test('Testando o Header', () => {
    renderWithRouter(<App />);

    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'email@email.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(buttonElement);

    const titleElement = screen.getByTestId('page-title');
    expect(titleElement).toBeInTheDocument();

    const profileElement = screen.getByTestId('profile-top-btn');
    expect(profileElement).toBeInTheDocument();

    const searchElement = screen.getByTestId('search-top-btn');
    expect(searchElement).toBeInTheDocument();

    userEvent.click(searchElement);
    userEvent.click(profileElement);
  });
});
