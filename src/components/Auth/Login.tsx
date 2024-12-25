import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';  // Access the AuthContext
import './Login.css'; // Import CSS for styling
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

const Login: React.FC = () => {
  useRedirectIfLoggedIn(); 

  // Always call hooks at the top of the component
  const authContext = useContext(AuthContext)!;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  let isSignup = location.state?.isSignup ?? false;

  if (!authContext) {
    return <p>Loading...</p>;
  }

  const handleAuth = async () => {
    setError(''); // Reset error on new submit attempt
    try {
      if (isSignup) {
        // Handle signup
        await authContext.handleSignup(username, password); // Assuming handleSignup method is implemented
        isSignup = false;
        navigate('/login');
      } else {
        // Handle login
        await authContext.handleLogin(username, password);
        navigate('/user');
      }
    } catch (err) {
      setError((err as Error).message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}  {/* Display error message */}
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="button"
          className="login-button"
          onClick={handleAuth}  // Trigger login on button click
        >
         {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
