import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const TotalPrice = ({totalHt, tva, shipping, totalTtc, count, button}) => {
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/cart/shipping');
    };

    return (
        <div className="total-price">
            <p className="total">Total de {count} article{count > 1 ? 's' : ''}</p>
            <div className="prices-container">
                <p>Total HT : <span>{totalHt}€</span></p>
                <p>TVA : <span>{tva}€</span></p>
                <p>Frais de port : <span>{shipping}€</span></p>
                <p>Total TTC : <span>{totalTtc}€</span></p>
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