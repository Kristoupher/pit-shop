import {Link, useParams} from "react-router-dom";
import CartList from "../components/CartList";
import TotalPrice from "../components/TotalPrice";
import { useGetOrderDetailsQuery} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import {formatDate} from "../utils/utils";
import { ChevronLeftCircle } from "lucide-react";

const OrderScreen = () => {
    const {id} = useParams();

    const {data: order, isLoading, error} = useGetOrderDetailsQuery(id);

    return (
        <>
        <Link to="/account" className="btn btn-primary flex flex-center mw-400"><ChevronLeftCircle size={25} />Retour aux commandes</Link>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="order section">
                        <h1>N° de commande : <span>{order.orderNumber} - {formatDate(order.orderDate)}</span></h1>
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

export default OrderScreen;