import {Link} from "react-router-dom";
import { Trash2 } from "lucide-react";
import {useDispatch} from "react-redux";
import {formatPrice, formatString} from "../utils/utils";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartList = ({img, title, size, price, qty, id, button, qtyStock, item}) => {

    const dispatch = useDispatch();

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    return (
        <div className="cart-list-item">
            <div>
                <div className="img">
                    <img src={img} alt={title}/>
                </div>
                <div className="title">
                    <Link to={`/product/${id}`}>{title}</Link>
                    <br/>
                    <span>{size.toUpperCase()}</span>
                </div>
            </div>
            <div>
                <p className="price">{formatPrice(price)}</p>
                {
                    button ? (
                        <>
                            <select name="qty" id="qty" onChange={(e) =>  addToCartHandler(item, Number(e.target.value))}>
                                {
                                    [...Array(qtyStock).keys()].map(x => (
                                        <option selected={qty === x + 1} key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))
                                }
                            </select>
                        <button onClick={() => { removeFromCartHandler(id) }}><Trash2 size={28} color="#fff"/></button>
                        </>
                    ) : (
                        <p className="qty"><strong>Qté : </strong>{qty}</p>
                    )
                }
            </div>
        </div>
    );
};

export default CartList;