// src/components/Logout.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Logout: React.FC = () => {
    const authContext  = useContext(AuthContext);

  const handleClick = async () => {
    if (authContext?.handleLogout) {
        await authContext.handleLogout();
        alert('You have been logged out.');
      } else {
        alert('Error: Not authenticated');
      }
  };

  return (
    <button onClick={handleClick}>Logout</button>
  );
};

export default Logout;
