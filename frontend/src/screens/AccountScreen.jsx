import {Link, useParams} from "react-router-dom";
import { useSelector} from "react-redux";
import {formatString, formatDate, formatPrice} from "../utils/utils";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Meta from "../components/Meta";

//Page de compte utilisateur
const AccountScreen = () => {
    //Réccupération du numéro de page dans l'url
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;
    //Réccupération des informations de l'utilisateur dans le state
    const { userInfo } = useSelector(state => state.auth);

    //Récupération des commandes de l'utilisateur
    const id = userInfo && userInfo._id;
    const { data, isLoading, error } = useGetMyOrdersQuery(id, pageNumber);


    return (
                <div className="account section">
                    {
                        userInfo && (
                            <>
                                <Meta title="Mon compte | Le Pit Shop"
                                      description="Découvrez tous les détails de votre compte utilisateur sur Le Pit Shop. Consultez vos informations personnelles,
                                    suivez vos commandes, gérez vos préférences et profitez d'une expérience de shopping personnalisée pour les passionnés de Formule 1.
                                    Mettez à jour votre profil et restez connecté à l'univers palpitant de la F1."
                                      keywords="Compte utilisateur, Profil client, Commandes en cours, Préférences de compte, Expérience personnalisée, Produits de Formule 1,
                                      Boutique en ligne de F1, Fans de course automobile, Passionnés de F1, Suivi des commandes, Gestion de profil, Accessoires de pilote,
                                      Merchandising F1."
                                />
                                <section className="head">
                                    <h1>Mon compte</h1>
                                    <Link title="Modifier mon profil" className="btn btn-primary" to="/account/edit">Modifier mon profil</Link>
                                </section>
                                <div className="infos">
                                    <p><span>{formatString(userInfo.gender)}</span> {formatString(userInfo.firstname) + ' ' + formatString(userInfo.lastname)}</p>
                                    <p>{userInfo.address.street + ', ' + userInfo.address.postalCode + ' ' + userInfo.address.city}</p>
                                </div>
                            </>
                        )
                    }
                    <h2>Mes commandes</h2>
                    {
                        isLoading ? <Loader /> : error ? <p>{error.message}</p> :
                            (
                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>N° de commande</th>
                                            <th>Date de commande</th>
                                            <th>Prix</th>
                                            <th>statut</th>
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
                                                    <td><Link title="Voir" className="btn btn-primary" to={`/account/order/${order._id}`}>Voir</Link></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        )
                    }
                    <Pagination currentPage={currentPage} totalPages={data && data.pages} url="/account/page/" />
                </div>
    );
};

export default AccountScreen;