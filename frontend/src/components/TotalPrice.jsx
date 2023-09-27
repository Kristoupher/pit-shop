import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {formatPrice} from "../utils/utils";

const TotalPrice = ({totalHt, tva, shipping, totalTtc, count, button}) => {
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/cart/shipping');
    };

    return (
        <div className="total-price">
            <p className="total">Total de {count} article{count > 1 ? 's' : ''}</p>
            <div className="prices-container">
                <p>Total HT : <span>{formatPrice(totalHt)}</span></p>
                <p>TVA : <span>{formatPrice(tva)}</span></p>
                <p>Frais de port : <span>{formatPrice(shipping)}</span></p>
                <p>Total TTC : <span>{formatPrice(totalTtc)}</span></p>
            </div>
            {
                button &&
                    <div className="btn-container">
                        <button onClick={checkoutHandler}  className="btn btn-primary">Valider le panier</button>
                    </div>
            }

        </div>
    );
};

export default TotalPrice;