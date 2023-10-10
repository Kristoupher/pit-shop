import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {formatPrice} from "../utils/utils";

//Composant qui affiche le total du panier dans la page panier et dans la page commande
const TotalPrice = ({totalHt, tva, shipping, totalTtc, count, button}) => {
    const navigate = useNavigate();

    //Fonction qui permet de rediriger l'utilisateur vers la page de connexion si il n'est pas connecté ou alors vers la page de livraison si il est connecté
    const checkoutHandler = () => {
        navigate('/login?redirect=/cart/shipping');
    };

    return (
        <div className="total-price">
            <p className="total">Total de {count} article{count > 1 ? 's' : ''}</p>
            <div className="prices-container">
                <p>Total HT : <span>{formatPrice(totalHt)}</span></p>
                <p>TVA : <span>{formatPrice(tva)}</span></p>
                <p className="bb_total">Frais de port : <span>{formatPrice(shipping)}</span></p>
                <p>Total TTC : <span>{formatPrice(totalTtc)}</span></p>
            </div>
            {
                button &&
                    <div className="btn-container">
                        <button title="Valider le panier" onClick={checkoutHandler}  className="btn btn-primary">Valider le panier</button>
                    </div>
            }

        </div>
    );
};

export default TotalPrice;