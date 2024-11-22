import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore';

const AdminRoute = ({children}) => {
    const { currentUser, loading } = useUserStore();

    if(loading) {
        return <div>Loading..</div>
    }
    if(currentUser && currentUser?.role === 'admin') {
        return children;
    }
    return <Navigate to="/login" replace/>
}

export default AdminRoute;

