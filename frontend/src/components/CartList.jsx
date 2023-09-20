import {Link} from "react-router-dom";
import { Trash2 } from "lucide-react";

const CartList = ({img, title, size, price, qty, id, button}) => {
    return (
        <div className="cart-list-item">
            <div>
                <div className="img">
                    <img src={img} alt={title}/>
                </div>
                <div className="title">
                    <Link to={`/product/${id}`}>{title}</Link>
                    <br/>
                    <span>{size}</span>
                </div>
            </div>
            <div>
                <p className="price">{price}€</p>
                {
                    button ? (
                        <>
                            <select name="qty" id="qty">
                                <option value={qty} selected>{qty}</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        <button><Trash2 size={28} color="#fff"/></button>
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