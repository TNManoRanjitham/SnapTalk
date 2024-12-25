import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Chat from './components/Chat/Chat';
import UserSelection from './components/UserSelection/UserSelection';
import { getUsers } from './services/userService';
import { AuthContext } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Header from './components/Header/Header';

const App = () => {
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  // Fetch users only if the user is logged in
  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers || []);
      }
    };

    fetchUsers();
  }, [user]); // Runs whenever the user is updated

  const handleSelectUser = (username: string) => {
    navigate(`/chat/${username}`); // Navigate to the selected user's chat
  };
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <SocketProvider>
      <div id="root">
        <Header />
        <div className="main-container">
          <Routes>
            {/* Redirect to /user if logged in, else to /login */}
            <Route path="/" element={<Navigate to={user ? "/user" : "/login"} />} />

            <Route path="/login" element={<div className="page-content"><Login /></div>} />
            <Route
              path="/user"
              element={
                user ? (
                  <ProtectedRoute>
                    <div className="page-content">
                      <UserSelection users={users} onSelectUser={handleSelectUser} />
                    </div>
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/chat/:username"
              element={
                user ? (
                  <ProtectedRoute>
                    <div className="page-content"> <Chat /></div>

                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </SocketProvider>
  );
};


export default App;
