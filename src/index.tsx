import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Assuming Login component is already created
import Chat from './components/Chat';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthProvider and AuthContext
import { useContext } from 'react';
import { SocketProvider } from './contexts/SocketContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);  // Access AuthContext

  // Check if context is available and if the user is logged in
  if (!authContext) {
    return <div>Loading...</div>;  // Show loading if context is not available
  }

  const { user } = authContext;

  return user ? <>{children}</> : <Navigate to="/login" replace />;  // Protect the route
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider>  {/* Wrap the application with AuthProvider */}
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/* Main App Route */}
          <Route path="/login" element={<Login />} /> {/* Login Page Route */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          /> {/* Protected Chat Route */}
        </Routes>
      </Router>
    </SocketProvider>
  </AuthProvider>
);
