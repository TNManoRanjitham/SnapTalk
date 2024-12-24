import React from 'react';

interface User {
  _id: string;
  username: string;
}

interface UserSelectionProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ users, onSelectUser }) => {
  return (
    <div>
      <h1>Select a User</h1>
      {users.map((user) => (
        <div key={user._id} style={{ margin: '10px 0' }}>
          <button onClick={() => onSelectUser(user._id)}>{user.username}</button>
        </div>
      ))}
    </div>
  );
};

export default UserSelection;
