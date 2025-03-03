import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';
import Login from './login';
import { MemoryRouter } from 'react-router-dom';

const mockLogin = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Login Component', () => {
  let providerProps;

  beforeEach(() => {
    providerProps = {
      value: {
        login: mockLogin,
        user: null,
      },
    };
  });

  test('renders login form', () => {
    const { getByLabelText, getByText } = renderWithContext(<Login />, { providerProps });
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  test('logs in successfully', () => {
    mockLogin.mockReturnValue(true);
    const { getByLabelText, getByText } = renderWithContext(<Login />, { providerProps });

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(getByText(/login/i));

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
    expect(console.log).toHaveBeenCalledWith('Login attempt for test@example.com: Success');
  });

  test('fails to log in', () => {
    mockLogin.mockReturnValue(false);
    const { getByLabelText, getByText } = renderWithContext(<Login />, { providerProps });

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(getByText(/login/i));

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(console.log).toHaveBeenCalledWith('Login attempt for test@example.com: Failure');
  });
});
