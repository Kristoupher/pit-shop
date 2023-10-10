import Stepper from "../components/Stepper";
import {Link} from "react-router-dom";

// Page de confirmation de commande
const OrderConfirmScreen = () => {
    return (
        <div className="order-confirm section">
            <Stepper step={3} />
            <h1>Félicitations 🎉</h1>
            <p>Votre commande est validée, vous pouvez suivre son évolution dans vos commandes.</p>
            <div className="btns-container">
                <Link title="Accueil" to="/" className="btn btn-tertiary">Accueil</Link>
                <Link title="Voir mes Commandes" to="/account" className="btn btn-primary">Mes commandes</Link>
            </div>
        </div>
    );
};

export default OrderConfirmScreen;