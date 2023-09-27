import {Link} from "react-router-dom";
import { useSelector} from "react-redux";
import {formatString, formatDate, formatPrice} from "../utils/utils";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";

const AccountScreen = () => {
    const { userInfo } = useSelector(state => state.auth);

    const id = userInfo && userInfo._id;

    const { data: orders, isLoading, error } = useGetMyOrdersQuery(id);


    return (
                <div className="account section">
                    {
                        userInfo && (
                            <>
                                <section className="head">
                                    <h1>Mon compte</h1>
                                    <Link className="btn btn-primary" to="/account/edit">Modifier mon profil</Link>
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
                                            orders && orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order.orderNumber}</td>
                                                    <td>{formatDate(order.createdAt)}</td>
                                                    <td>{formatPrice(order.totalPrice)}</td>
                                                    <td>{formatString(order.status)}</td>
                                                    <td><Link className="btn btn-primary" to={`/account/order/${order._id}`}>Voir</Link></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        )
                    }
                </div>
    );
};

export default AccountScreen;