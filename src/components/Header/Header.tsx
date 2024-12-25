import React, { useContext, useState } from 'react';
import { FaSignOutAlt , FaUserPlus, FaSignInAlt} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming CSS file for styling

const Header = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.handleLogout;
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleLogout = () => {
    if (logout) {
      logout(); // Perform logout action
    }
    navigate('/login'); // Redirect to login page
  };

  const handleSignupToggle = () => {
    setIsSignup(!isSignup);
    navigate('/login', { state: { isSignup: !isSignup } });
  };
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="snap-talk-label">SnapTalk</span>
          {user && <span className="user-id">Logged in as: {user.userId}</span>}
        </div>
        <div className="header-right">
          {user ? (
            <div onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" />
            </div>
          ) : (
            <div onClick={handleSignupToggle} className="signup-login-toggle">
              {/* Display icons based on signup/login state */}
              {isSignup ? (
                <FaSignInAlt className="login-icon" title='Login'/>
              ) : (
                <FaUserPlus className="signup-icon" title='Signup' />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
