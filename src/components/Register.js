import React, { useContext, useState } from 'react';
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

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      register(username, email, password);
      navigate('/home');
    }
  };

  return (
    <div className={formStyles}>
      <h2 className={titleStyle}>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Stack tokens={{ childrenGap: 15 }}>
          <TextField label="Username" value={username} onChange={(e, newValue) => setUsername(newValue)} />
          <TextField label="Email" value={email} onChange={(e, newValue) => setEmail(newValue)} />
          <TextField label="Password" type="password" value={password} onChange={(e, newValue) => setPassword(newValue)} />
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e, newValue) => setConfirmPassword(newValue)} />
          <PrimaryButton type="submit" style={{ marginTop: '10px', width: '100%' }}>Register</PrimaryButton>
        </Stack>
      </form>
      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
