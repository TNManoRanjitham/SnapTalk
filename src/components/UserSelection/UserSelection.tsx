import React from 'react';
import './UserSelection.css';
import { useParams, useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
}

interface UserSelectionProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ users, onSelectUser }) => {
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or session storage
    localStorage.removeItem('userId'); // Example: Clear stored userId
    navigate('/login'); // Redirect to login page
  };
  
  return (
    <div className='user-selection-container'>
      <h1>Select a User</h1>
      <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      {users.map((user) => (
        <div key={user._id} style={{ margin: '10px 0' }}>
          <button onClick={() => onSelectUser(user.username)}>{user.username}</button>
        </div>
      ))}
    </div>
  );
};

export default UserSelection;
