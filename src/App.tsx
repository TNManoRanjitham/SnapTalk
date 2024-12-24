import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import Chat from './components/Chat';
import Logout from './components/Logout';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Ensure the context is defined before accessing its values
  if (!authContext) {
    return <div>Loading...</div>;  // Show loading until AuthContext is available
  }

  const { user } = authContext;

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  return (
        <div className="App">
          <header className="App-header">
            {user ? (
              <>
                <h1>Welcome to SnapTalk, {user.userId}!</h1>
                <p>Start chatting with your friends now.</p>
                <Logout />
              </>
            ) : (
              <p>Please log in to continue.</p>
            )}
          </header>

          {user ? (
            <div className="chat-container">
              <Chat />
            </div>
          ) : (
            <p className="login-message" onClick={handleLoginClick}>
              Please log in to continue.
            </p>
          )}
        </div>
  );
};

export default App;
