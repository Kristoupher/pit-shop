import Stepper from "../components/Stepper";
import {Link} from "react-router-dom";
import Meta from "../components/Meta";

// Page de confirmation de commande
const OrderConfirmScreen = () => {
    return (
        <div className="order-confirm section">
            <Meta title="Commande validée | Le Pit Shop"
                  description="Votre commande sur Le Pit Shop a été confirmée avec succès. Découvrez les détails de votre achat et suivez l'état de
                  votre livraison. Nous vous remercions de votre achat et vous invitons à explorer notre gamme exceptionnelle de produits de Formule 1.
                  Profitez d'une expérience de shopping F1 sans pareille."
                  keywords="Confirmation de commande, Détails d'achat, Suivi de livraison, Commande réussie, Produits de Formule 1, Boutique en ligne
                  de F1, Fans de course automobile, Articles de pilote, Merchandising F1, Expérience de shopping F1, Le Pit Shop, Numéro de commande,
                  Récapitulatif d'achat, Confirmation d'achat."
            />
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