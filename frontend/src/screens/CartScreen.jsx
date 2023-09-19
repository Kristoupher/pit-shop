import CartList from "../components/CartList";
import Mercedes from "../assets/images/mercedes.svg";
import TotalPrice from "../components/TotalPrice";

const CartScreen = () => {
    return (
        <div className="cart section">
            <h1>Votre panier</h1>
            <div className="cart-container section">
                <div className="cart-list">
                    <CartList img={Mercedes} title="Polo Mercedes f1 Team" size="M" price="45,00" qty={1} id="1jkj3jdk" />
                    <CartList img={Mercedes} title="Polo Mercedes f1 Team" size="M" price="45,00" qty={1} id="1jkj3jdk" />
                    <CartList img={Mercedes} title="Polo Mercedes f1 Team" size="M" price="45,00" qty={1} id="1jkj3jdk" />
                </div>
                <TotalPrice totalHt="135,00" tva="27,00" shipping="0,00" totalTtc="162,00" count="3" />
            </div>
        </div>
    );
};

export default CartScreen;