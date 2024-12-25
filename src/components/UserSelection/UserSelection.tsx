import React, { useContext } from 'react';
import './UserSelection.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/SocketContext';

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
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  // Check if context is available
  if (!socketContext || !authContext) {
    return <p>Loading...</p>;
  }
  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or session storage
    authContext.handleLogout();
    navigate('/login'); // Redirect to login page
  };

   // When a user is selected, trigger the fetching of undelivered messages
   const handleUserSelect = (username: string) => {
    onSelectUser(username);
  };

  return (
    <div className='user-selection-container'>
      <h1>Select a User</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {users.map((user) => (
        <div key={user._id} style={{ margin: '10px 0' }}>
          <button onClick={() => handleUserSelect(user.username)}>{user.username}</button>
        </div>
      ))}
    </div>
  );
};

export default UserSelection;
