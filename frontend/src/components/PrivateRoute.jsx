import { Outlet, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

//Protéger les routes privées
const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return (
        userInfo ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoute;