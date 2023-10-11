import CartList from "../components/CartList";
import TotalPrice from "../components/TotalPrice";
import { toast } from "react-toastify";
import { clearCartItems, removeFromCart} from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";

// Page panier
const CartScreen = () => {
    const dispatch = useDispatch();
    // Récupération des données du panier dans le state
    const cart = useSelector(state => state.cart);
    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

    // Suppression de tous les articles du panier
    const deleteCart = () => {
        dispatch(clearCartItems());
        toast.success('Panier vidé avec succès');
    }

    // Suppression d'un article du panier
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart section">
            <Meta title="Votre panier | Le Pit Shop"
                  description="Découvrez ce qui se trouve dans votre panier sur Le Pit Shop. Trouvez tous vos produits de Formule 1 préférés
                soigneusement sélectionnés. Ajoutez, supprimez et ajustez les quantités pour créer le panier idéal. Préparez-vous à vivre une
                expérience de shopping F1 inégalée avec des produits de qualité et un service exceptionnel."
                  keywords="Panier d'achat, Produits de Formule 1, Articles F1, Accessoires de course, Merchandising F1, Panier en ligne, Articles
                  de pilote, Équipement de course, Boutique F1, Passionnés de Formule 1, Boutique en ligne de F1, Souvenirs de F1, Produits dérivés F1,
                  Panier de commande."

            />
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
                                    <CartList item={item} key={item._id} img={item.image} title={item.name} size={item.size} price={item.price} qty={item.qty} id={item._id} qtyStock={item.qtyStock} button={true} />
                                ))
                            }
                            <div className="center">
                                <button title="Vider le panier" onClick={deleteCart} className="btn btn-secondary">Vider le panier</button>
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