import {Link} from "react-router-dom";
import { useSelector} from "react-redux";
import formatString from "../utils/utils";

const AccountScreen = () => {
    const { userInfo } = useSelector(state => state.auth);


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
                            <tr>
                                <td>15edg1t551f15d</td>
                                <td>21/08/2023</td>
                                <td>75,00€</td>
                                <td>Livrée</td>
                                <td><Link className="btn btn-primary" to="/account/order/15edg1t551f15d">Voir</Link></td>
                            </tr>
                            <tr>
                                <td>15edg1t551f15d</td>
                                <td>21/08/2023</td>
                                <td>75,00€</td>
                                <td>Livrée</td>
                                <td><Link className="btn btn-primary" to="/account/order/15edg1t551f15d">Voir</Link></td>
                            </tr>
                            <tr>
                                <td>15edg1t551f15d</td>
                                <td>21/08/2023</td>
                                <td>75,00€</td>
                                <td>Livrée</td>
                                <td><Link className="btn btn-primary" to="/account/order/15edg1t551f15d">Voir</Link></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    );
};

export default AccountScreen;