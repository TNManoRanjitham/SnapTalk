import React, { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming CSS file for styling

const Header = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.handleLogout;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout(); // Perform logout action
    }
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="snap-talk-label">SnapTalk</span>
          {user && <span className="user-id">Logged in as: {user.userId}</span>}
        </div>
        {user && (
        <div className="header-right" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
        </div>
         )}
      </div>
    </header>
  );
};

export default Header;
