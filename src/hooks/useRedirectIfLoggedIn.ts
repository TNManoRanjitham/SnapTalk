// hooks/useRedirectIfLoggedIn.ts
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const useRedirectIfLoggedIn = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) return;

    const { user } = authContext;

    if (user && localStorage.getItem('userId')) {
      navigate('/user', { replace: true });
    }
  }, [authContext, navigate]);
};

export default useRedirectIfLoggedIn;
