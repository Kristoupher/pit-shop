import { BadgeEuro} from "lucide-react";
import {Link, useParams} from "react-router-dom";
import {formatDate, formatPrice, formatString} from "../../utils/utils";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";

// Page de gestion des commandes
const OrdersPanelScreen = () => {
    //Récupération du numéro de page dans l'URL
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;
    //Récupération des commandes
    const { data, isLoading, error } = useGetOrdersQuery(pageNumber);

    return (
        <section className="account">
            <Meta title="Gestion des commandes | Le Pit Shop"
                  description="Explorez la liste complète des commandes sur Le Pit Shop avec notre interface d'administration conviviale. Consultez les
                  commandes en attente, en cours ou complétées, suivez l'état de la livraison et gérez efficacement les transactions. Optimisez votre
                  gestion des ventes, suivez les tendances d'achat et assurez une expérience client exceptionnelle sur notre boutique F1 en ligne."
                  keywords="Liste des commandes, Gestion des commandes, Suivi des ventes, Statut de livraison, Interface d'administration, Boutique en
                  ligne de F1, Produits de Formule 1, Fans de course automobile, Expérience de gestion des ventes, Le Pit Shop, Processus de commande,
                  Interface conviviale, Gestion des transactions."
            />
            <Link title="Retour" className="btn btn-primary mb-5" to="/admin">Retour</Link>
            <h1 className="flex flex-align-center"><BadgeEuro size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des commandes</h1>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="table-responsive section">
                        <table>
                            <thead>
                            <tr>
                                <th>N° de commande</th>
                                <th>Date de commande</th>
                                <th>Prix</th>
                                <th>Prix</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data && data.orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.orderNumber}</td>
                                        <td>{formatDate(order.createdAt)}</td>
                                        <td>{formatPrice(order.totalPrice)}</td>
                                        <td>{formatString(order.status)}</td>
                                        <td><Link title="Voir" className="btn btn-primary" to={`/admin/order/${order._id}`}>Voir</Link></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                )
            }
            <Pagination currentPage={currentPage} totalPages={data && data.pages} url="/admin/orders/page/" />
        </section>
    );
};

export default OrdersPanelScreen;