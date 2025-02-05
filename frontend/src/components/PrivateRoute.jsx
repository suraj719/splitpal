import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
