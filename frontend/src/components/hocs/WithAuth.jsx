import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const WithAuth = ({ children }) => {
  const { isAuthorized } = useAuth();

  return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default WithAuth;
