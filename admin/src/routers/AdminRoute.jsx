import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const token = localStorage.getItem('token');
  if(!token) {
    return <Navigate to="/"/>
  }
  return children ?  children : <Outlet/>;
}

export default AdminRoute