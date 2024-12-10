import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore';

const PrivateRoute = ({children}) => {
    const { currentUser } = useUserStore();
    
    if(currentUser) {
        return children;
    }
    return <Navigate to="/login" replace/>
}

export default PrivateRoute