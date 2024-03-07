import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";


const ProtectedRoute = ({children}) =>{
    const {user} = useAuthContext();
    if (!user) {
        return <Navigate to="/login"/>
    }
    return children
}
export default ProtectedRoute;