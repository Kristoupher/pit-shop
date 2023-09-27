import CartList from "../components/CartList";
import Mercedes from "../assets/images/mercedes.svg";
import TotalPrice from "../components/TotalPrice";
import { toast } from "react-toastify";
import { clearCartItems, removeFromCart} from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

    const deleteCart = () => {
        dispatch(clearCartItems());
        toast.success('Panier vidé avec succès');
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart section">
            <h1>Votre panier</h1>
            {
                cartItems.length === 0 ? (
                    <div className="center alert section">
                        <p>Votre panier est vide.</p>
                    </div>
                ) : (
                    <div className="cart-container section">
                        <div className="cart-list">
                            {
                                cartItems.map(item => (
                                    <CartList key={item._id} img={item.image} title={item.name} size={item.size} price={item.price} qty={item.qty} id={item._id} qtyStock={item.qtyStock} button={true} />
                                ))
                            }
                            <div className="center">
                                <button onClick={deleteCart} className="btn btn-secondary">Vider le panier</button>
                            </div>
                        </div>
                        {
                            cartItems.length > 0 && (
                                    <TotalPrice totalHt={itemsPrice} tva={taxPrice} shipping={shippingPrice} totalTtc={totalPrice} count={cartItems.reduce((acc, item) => acc + item.qty, 0)} button={true} />
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default CartScreen;