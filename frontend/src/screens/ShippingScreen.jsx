import Stepper from "../components/Stepper";
import {Link} from "react-router-dom";

const ShippingScreen = () => {
    return (
        <div className="shipping section">
            <Stepper step={1} />
            <form className="form section">
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" defaultValue="Kristopher" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" defaultValue="Arregui" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input type="text" id="address" defaultValue="12 rue du stade" />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Code postal</label>
                    <input type="text" id="postalCode" defaultValue="33000" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ville</label>
                    <input type="text" id="city" defaultValue="Bordeaux" />
                </div>
                <div className="btn-container">
                    <Link to="/cart/payment" className="btn btn-primary">Suivant</Link>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;