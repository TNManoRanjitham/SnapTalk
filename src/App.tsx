import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Chat from './components/Chat/Chat';
import UserSelection from './components/UserSelection/UserSelection';
import { getUsers } from './services/userService';
import { AuthContext } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

const App = () => {
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
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
    window.location.href = `/chat/${username}`; // Navigate to the selected user's chat
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <SocketProvider>{children}</SocketProvider>;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/user" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user"
        element={
          user ? (
            <ProtectedRoute>
              <UserSelection users={users} onSelectUser={handleSelectUser} />
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
              <Chat />
            </ProtectedRoute>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
