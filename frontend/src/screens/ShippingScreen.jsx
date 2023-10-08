import Stepper from "../components/Stepper";
import {Link} from "react-router-dom";
import { saveShippingAddress } from '../slices/cartSlice';
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    const { shippingAddress } = useSelector(state => state.cart);
    const [street, setStreet] = useState(shippingAddress.street || userInfo.address.street);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || userInfo.address.postalCode);
    const [city, setCity] = useState(shippingAddress.city || userInfo.address.city);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ street, postalCode, city }));
        navigate('/cart/payment');
    }

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
                    <input type="text" id="address" defaultValue={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Code postal</label>
                    <input type="text" id="postalCode" defaultValue={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ville</label>
                    <input type="text" id="city" defaultValue={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="btn-container">
                    <button onClick={submitHandler} className="btn btn-primary">Suivant</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;