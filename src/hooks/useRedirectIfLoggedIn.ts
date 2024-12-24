// hooks/useRedirectIfLoggedIn.ts
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have AuthContext
import { useNavigate } from 'react-router-dom';

const useRedirectIfLoggedIn = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) return;

    const { user } = authContext;

    if (user && localStorage.getItem('userId')) {
      navigate('/chat', { replace: true });
    }
  }, [authContext, navigate]);
};

export default useRedirectIfLoggedIn;
