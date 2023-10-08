import { BadgeEuro} from "lucide-react";
import {Link, useParams} from "react-router-dom";
import {formatDate, formatPrice, formatString} from "../../utils/utils";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

const OrdersPanelScreen = () => {
    const { pageNumber } = useParams() || 1;

    const currentPage = pageNumber ? pageNumber : 1;
    const { data, isLoading, error } = useGetOrdersQuery(pageNumber);

    return (
        <section className="account">
            <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
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
                                        <td><Link className="btn btn-primary" to={`/admin/order/${order._id}`}>Voir</Link></td>
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