import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem('accessToken');
    const getAdminId = localStorage.getItem('admin_id');

    if (!getToken) {
      navigate('/');
    } else {
      setToken(getToken);
      setAdminId(getAdminId);
    }
  }, [navigate]);

  return { token, adminId };
};

export default useAuth;
