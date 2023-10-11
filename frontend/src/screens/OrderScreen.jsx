import {Link, useParams} from "react-router-dom";
import CartList from "../components/CartList";
import TotalPrice from "../components/TotalPrice";
import { useGetOrderDetailsQuery} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import {formatDate} from "../utils/utils";
import { ChevronLeftCircle } from "lucide-react";
import Meta from "../components/Meta";

//Page d'une commande
const OrderScreen = () => {
    //Récupération de l'id de la commande et de la commande
    const {id} = useParams();
    const {data: order, isLoading, error} = useGetOrderDetailsQuery(id);

    return (
        <>
        <Link title="Retour aux commandes" to="/account" className="btn btn-primary flex flex-center mw-400"><ChevronLeftCircle size={25} />Retour aux commandes</Link>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="order section">
                        <Meta title={`Commande n°${order.orderNumber} | Le Pit Shop`}
                              description="Consultez les détails de votre commande sur Le Pit Shop. Suivez l'état de votre livraison, explorez les articles
                              que vous avez choisis et obtenez des informations précieuses sur votre achat. Découvrez l'expérience complète de shopping F1
                              avec des produits de qualité et un service exceptionnel. Plongez dans l'univers passionnant de la Formule 1 avec Le Pit Shop."
                              keywords="Visualisation de commande, Détails d'achat, Suivi de livraison, Produits de Formule 1, Boutique en ligne de F1, Fans
                              de course automobile, Articles de pilote, Merchandising F1, Expérience de shopping F1, Le Pit Shop, Numéro de commande, Historique
                              d'achat, Informations de livraison, Confirmation de commande."
                        />
                        <h1>N° de commande : <span>{order.orderNumber} - {formatDate(order.orderDate)}</span></h1>
                        <p className="badge">{order.status}</p>
                        <p><strong>Adresse de livraison :</strong></p>
                        <span>
                            {order.shippingAddress.street}, {order.shippingAddress.city},
                            <br/>
                            {order.shippingAddress.postalCode}
                        </span>
                        <div className="cart-container section">
                            <div className="cart-list">
                                {
                                    order.orderItems.map((item) => (
                                        <CartList key={item._id} img={item.image} title={item.name} size={item.size} price={item.price} qty={item.qty} id={item._id} button={false} />
                                    ))
                                }
                            </div>
                            {
                                <TotalPrice totalHt={order.itemsPrice} tva={order.taxPrice} shipping={order.shippingPrice} totalTtc={order.totalPrice} count={order.orderItems.length} button={false} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default OrderScreen;