import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Assuming Login component is already created
import Chat from './components/Chat';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthProvider and AuthContext
import { useContext } from 'react';
import { SocketProvider } from './contexts/SocketContext';

// Create a reusable Header component
const Header = () => (
  <header>
    <h1>SnapTalk</h1>
  </header>
);


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return user ? (
    <SocketProvider>
      {children}
    </SocketProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider>
    <Router>
      <Header /> {/* Include the SnapTalk header at the top */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);
