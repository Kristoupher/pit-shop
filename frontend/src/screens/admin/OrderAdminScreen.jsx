import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import CartList from "../../components/CartList";
import TotalPrice from "../../components/TotalPrice";
import { useGetOrderDetailsQuery, useUpdateOrderStatusMutation } from "../../slices/ordersApiSlice";
import { useGetUserByIdQuery} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import {formatDate, formatString, removeFirstChar} from "../../utils/utils";
import {XCircle} from "lucide-react";
import {toast} from "react-toastify";
import Meta from "../../components/Meta";

//Liste des commandes
const OrderAdminScreen = () => {
    //Récupération de l'id de la commande et de la commande et de la fonction de mise à jour du statut de la commande
    const {id} = useParams();
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(id);
    const [updateOrderStatus, {isLoading: loadingUpdate}] = useUpdateOrderStatusMutation();

    //States pour le modal et le statut de la commande
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(order && order.status);

    //Mise à jour du statut de la commande
    useEffect(() => {
        if(order){
            setStatus(order.status);
        }
    }, [order]);

    //Fonction de mise à jour du statut de la commande
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(status === order.status || status === ''){
                toast.error('Veuillez choisir un statut différent');
            } else {
                await updateOrderStatus({orderId: order._id, status});
                setModal(false);
                toast.success('Statut de la commande mis à jour avec succès');
                refetch();
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }


    return (
        <>
            <Link title="Retour" to="/admin/orders" className="btn btn-primary flex flex-center mw-400">Retour aux commandes</Link>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="order section">
                        <Meta title={`Commande n°${order.orderNumber}`}
                              description="Accédez aux détails complets des commandes sur Le Pit Shop avec notre interface d'administration conviviale.
                              Visualisez les informations essentielles des commandes, suivez l'état de la livraison et gérez les détails des
                              transactions en temps réel. Optimisez votre processus de gestion des commandes et assurez une expérience client sans
                              faille sur notre boutique F1 en ligne."
                              keywords="Visualisation de commande, Détails de commande, Suivi de livraison, Gestion des transactions, Interface
                              d'administration, Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile, Expérience de gestion des
                              commandes, Le Pit Shop, Processus de commande, Interface conviviale, Gestion des ventes."
                        />
                        <div className="flex-between-desktop">
                            <h1>N° de commande : <span>{order.orderNumber} - {formatDate(order.orderDate)}</span></h1>
                            <button title="Modifier le statut" className="btn btn-primary flex flex-center mw-400" onClick={() => setModal(true)}>Modifier le statut</button>
                        </div>
                        <p>Par {formatString(order.user.firstname)} {formatString(order.user.lastname)}</p>
                        <p className="badge">{formatString(order.status)}</p>
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
                        <div className={`modal ${modal ? 'active' : ''}`}>
                            <div className="modal-content">
                                <span onClick={() => setModal(false)}><XCircle size={35} color="#2E2E2E" /></span>
                                <p className="title">Statut de la commande</p>
                                <form className="form">
                                    <div className="form-group center">
                                        <select name="status" id="" className="mt-6 w-75" onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choisir un statut</option>
                                            <option selected={order.status === "en-cours-de-traitement"} value="en-cours-de-traitement">En cours de traitement</option>
                                            <option selected={order.status === "expédiée"} value="expédiée">Expédiée</option>
                                            <option selected={order.status === "en-cours-de-livraison"} value="en-cours-de-livraison">En cours de livraison</option>
                                            <option selected={order.status === "livrée"} value="livrée">Livrée</option>
                                            <option selected={order.status === "payée"} value="payée">Payée</option>
                                        </select>
                                    </div>
                                    <div className="center">
                                        <button title="Mettre à jour" className="btn btn-primary mt-6 w-50" onClick={handleSubmit}>Mettre à jour</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default OrderAdminScreen;