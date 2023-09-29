import {Link, useParams} from "react-router-dom";
import CartList from "../../components/CartList";
import TotalPrice from "../../components/TotalPrice";
import { useGetOrderDetailsQuery} from "../../slices/ordersApiSlice";
import { useGetUserByIdQuery} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import {formatDate, formatString} from "../../utils/utils";

const OrderAdminScreen = () => {
    const {id} = useParams();

    const {data: order, isLoading, error} = useGetOrderDetailsQuery(id);


    return (
        <>
            <Link to="/admin/orders" className="btn btn-primary flex flex-center mw-400">Retour aux commandes</Link>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="order section">
                        <h1>N° de commande : <span>{order.orderNumber} - {formatDate(order.orderDate)}</span></h1>
                        <p>Par {formatString(order.user.firstname)} {formatString(order.user.lastname)}</p>
                        <div className="cart-container section">
                            <div className="cart-list">
                                {
                                    order.orderItems.map((item) => (
                                        <CartList key={item._id} img={item.image} title={item.name} size={item.size} price={item.price} qty={item.qty} id={item._id} button={false} />
                                    ))
                                }
                            </div>
                            {
                                <TotalPrice totalHt={order.totalPrice} tva={order.taxPrice} shipping={order.shippingPrice} totalTtc={order.totalPrice} count={order.orderItems.length} button={false} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default OrderAdminScreen;