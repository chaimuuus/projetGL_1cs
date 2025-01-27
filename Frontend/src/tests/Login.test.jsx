import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { login, loginArtisan } from '../api/auth';
import Cookies from 'js-cookie';

// Mock RightSection and Footer components
jest.mock('../components/SignUp/RightSection', () => {
  return function MockRightSection() {
    return <div data-testid="right-section">Right Section</div>;
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('../api/auth', () => ({
  login: jest.fn(),
  loginArtisan: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form with all elements', () => {
    render(<Login />);

    expect(screen.getByText('DZ-Artisan')).toBeInTheDocument();
    expect(screen.getByLabelText(/Addresse Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Connexion/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await userEvent.click(submitButton);

    expect(screen.getByText(/Le champ Email est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/Le champ Mot de Passe est requis/i)).toBeInTheDocument();
  });

  it('shows error for invalid email format', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Addresse Email/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });
    
    // Type an invalid email
    await userEvent.type(emailInput, 'invalid-email');
    
    // Submit the form
    fireEvent.submit(submitButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/Veuillez entrer un email valide/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error for weak password', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Addresse Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'weak');
    await userEvent.click(submitButton);

    expect(screen.getByText(/Le mot de passe doit contenir/i)).toBeInTheDocument();
  });

  it('successfully logs in with user credentials', async () => {
    const mockToken = 'user-access-token';
    login.mockResolvedValueOnce({ access_token: mockToken });

    render(<Login />);
    const emailInput = screen.getByLabelText(/Addresse Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'ValidPassword123');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'ValidPassword123',
      });
      expect(Cookies.set).toHaveBeenCalledWith('token', mockToken, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
    });
  });

  it('tries artisan login if user login fails', async () => {
    const mockArtisanToken = 'artisan-access-token';
    login.mockRejectedValueOnce(new Error('User login failed'));
    loginArtisan.mockResolvedValueOnce({ access_token: mockArtisanToken });

    render(<Login />);
    const emailInput = screen.getByLabelText(/Addresse Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'ValidPassword123');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
      expect(loginArtisan).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'ValidPassword123',
      });
      expect(Cookies.set).toHaveBeenCalledWith('token', mockArtisanToken, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
    });
  });

  it('shows error alert when both login attempts fail', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    login.mockRejectedValueOnce(new Error('User login failed'));
    loginArtisan.mockRejectedValueOnce(new Error('Artisan login failed'));

    render(<Login />);
    const emailInput = screen.getByLabelText(/Addresse Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'ValidPassword123');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Email ou mot de passe incorrect.');
    });

    alertSpy.mockRestore();
  });
});