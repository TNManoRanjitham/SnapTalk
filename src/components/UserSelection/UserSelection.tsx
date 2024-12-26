import React, { useContext } from 'react';
import './UserSelection.css';
import { AuthContext } from '../../contexts/AuthContext';

interface User {
  _id: string;
  username: string;
}

interface UserSelectionProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ users, onSelectUser }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <p>Loading...</p>;
  }

  // When a user is selected, trigger the fetching of undelivered messages
  const handleUserSelect = (username: string) => {
    onSelectUser(username);
  };

  return (
    <div className='user-selection-container'>
      <h1>Select a User to Chat</h1>
      
      <div className='user-list'>
        {users.map((user) => (
          <div key={user._id} className='user-item'>
            <button className='user-button' onClick={() => handleUserSelect(user.username)}>
              {user.username}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSelection;
