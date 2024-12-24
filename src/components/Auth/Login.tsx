import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Check if context is available
  if (!authContext) {
    return <p>Loading...</p>;
  }

  // Handle login when the button is clicked
  const LoginClick = async () => {
    setError('');  // Clear previous error messages
    try {
      // Attempt login using context
      await authContext.handleLogin(username, password);
      navigate('/user');  // Redirect to the chat page

    } catch (err) {
      setError((err as Error).message || 'Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          onClick={LoginClick}  // Trigger login on button click
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
