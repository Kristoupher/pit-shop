import Stepper from "../components/Stepper";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ShippingScreen = () => {
    const { userInfo } = useSelector(state => state.auth);

    return (
        <div className="shipping section">
            <Stepper step={1} />
            <form className="form section">
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" defaultValue={userInfo.firstname} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" defaultValue={userInfo.lastname} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input type="text" id="address" defaultValue={userInfo.address.street} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Code postal</label>
                    <input type="text" id="postalCode" defaultValue={userInfo.address.postalCode} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ville</label>
                    <input type="text" id="city" defaultValue={userInfo.address.city} />
                </div>
                <div className="btn-container">
                    <Link to="/cart/payment" className="btn btn-primary">Suivant</Link>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;