import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, PrimaryButton, Stack, Link, mergeStyles } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

// Styling for the background and form
const formStyles = mergeStyles({
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f4f4f9',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  border: '1px solid #ddd',
});

const titleStyle = mergeStyles({
  fontSize: '24px',
  fontWeight: '600',
  color: '#333',
});

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const logLoginAttempt = (email, success) => {
    console.log(`Login attempt for ${email}: ${success ? 'Success' : 'Failure'}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    logLoginAttempt(email, success);

    if (success) {
      if (rememberMe) {
        // If the user selects 'Remember Me', keep them logged in
        localStorage.setItem('user', JSON.stringify({ email, password }));
      }
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={formStyles}>
      <h2 className={titleStyle}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Stack tokens={{ childrenGap: 15 }}>
          <TextField label="Email" value={email} onChange={(e, newValue) => setEmail(newValue)} />
          <TextField label="Password" type="password" value={password} onChange={(e, newValue) => setPassword(newValue)} />
          <PrimaryButton type="submit" style={{ marginTop: '10px', width: '100%' }}>Login</PrimaryButton>
        </Stack>
      </form>
      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link href="/register">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
