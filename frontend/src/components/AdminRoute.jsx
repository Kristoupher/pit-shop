import { Outlet, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

// Permet de sécuriser les routes admin

const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return (
        userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />
    );
};

export default AdminRoute;