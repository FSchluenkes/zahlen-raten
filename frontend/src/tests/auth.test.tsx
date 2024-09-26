import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { handleLogin, handleRegister } from '@/lib/client-auth';
import AuthForm from '@/components/login-form/login-form';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<AuthForm />);
    expect(screen.getByLabelText('Benutzername')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anmelden' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrieren' })).toBeInTheDocument();
  });

  it('handles login correctly', async () => {
    render(<AuthForm />);
    
    await userEvent.type(screen.getByLabelText('Benutzername'), 'testuser');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: 'Anmelden' }));

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  it('handles registration correctly', async () => {
    render(<AuthForm />);
    
    await userEvent.type(screen.getByLabelText('Benutzername'), 'newuser');
    await userEvent.type(screen.getByLabelText('Password'), 'newpassword123');
    
    fireEvent.click(screen.getByRole('button', { name: 'Registrieren' }));

    await waitFor(() => {
      expect(handleRegister).toHaveBeenCalledWith('newuser', 'newpassword123');
    });
  });

  it('displays error message on failed login', async () => {
    (handleLogin as jest.Mock).mockRejectedValue(new Error('Login failed'));
    
    render(<AuthForm />);
    
    await userEvent.type(screen.getByLabelText('Benutzername'), 'testuser');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    
    fireEvent.click(screen.getByRole('button', { name: 'Anmelden' }));

    await waitFor(() => {
      expect(screen.getByText('Falscher Benutzername oder Passwort')).toBeInTheDocument();
    });
  });

  it('disables buttons when fields are empty', () => {
    render(<AuthForm />);
    
    expect(screen.getByRole('button', { name: 'Anmelden' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Registrieren' })).toBeDisabled();
  });
});