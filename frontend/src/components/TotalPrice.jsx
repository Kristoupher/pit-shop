import {Link} from "react-router-dom";

const TotalPrice = ({totalHt, tva, shipping, totalTtc, count, button}) => {
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
                        <Link to="/login?redirect=/cart/shipping" className="btn btn-primary">Valider le panier</Link>
                    </div>
            }

        </div>
    );
};

export default TotalPrice;