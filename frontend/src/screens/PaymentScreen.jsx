import Stepper from "../components/Stepper";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCreateOrderMutation, useGetPayPalClientIdQuery } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

//Page de paiement
const PaymentScreen = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

//Création de la commande
const [ createOrder, { isLoading, error } ] = useCreateOrderMutation();
//Paypal
const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
//Récupération des données du panier
const { cartItems, itemsPrice, shippingPrice, shippingAddress, taxPrice, totalPrice } = useSelector(state => state.cart);
//Récupération des données de l'utilisateur
const { userInfo } = useSelector(state => state.auth);
//Récupération de l'id client paypal
const { data: paypal, isLoading: loadingPayPal, error: errorPayPal  } = useGetPayPalClientIdQuery();
//Données de la commande
const dataOrder = {
    orderItems: cartItems,
    user: userInfo._id,
    shippingAddress: shippingAddress,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
}

//Ajout de la commande
const addOrder = async () => {
    try {
        const res = await createOrder(dataOrder).unwrap();
        dispatch(clearCartItems());
    } catch (err) {
        toast.error(err?.data?.message || err.message);
    }
}

//Chargement du script paypal
useEffect(() => {
    if(!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPayPalScript = async () => {
            paypalDispatch({
                type: "resetOptions",
                value: {
                    "client-id": paypal.clientId,
                    currency: "EUR",
                }
            });
            paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        }
        loadPayPalScript();
    }
}, [paypal, paypalDispatch, loadingPayPal, errorPayPal]);

//Si le paiement est accepté
    function onApprove(data, actions) {
        return actions.order.capture().then(async function() {
            try {
                await addOrder();
                //vider le state du panier et le local storage
                localStorage.removeItem("cart");
                dispatch(clearCartItems());
                //rediriger vers la page de confirmation de commande
                navigate('/cart/confirm');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }

    //Si le paiement est refusé
    function onError(err) {
        toast.error(err.message);
    }

    //Création de la commande
    function creatingOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    }

    return (
        <div className="payment section">
            <Meta title="Payer ma commande | Le Pit Shop"
                  description="Effectuez votre paiement en toute sécurité sur Le Pit Shop. Choisissez parmi nos options de paiement sécurisées et
                  finalisez votre commande en toute confiance. Nous utilisons des méthodes de paiement sécurisées pour garantir la confidentialité de
                  vos informations. Profitez d'une expérience de paiement fluide et sécurisée tout en acquérant des produits de qualité de la Formule 1."
                  keywords="Paiement en ligne, Méthodes de paiement sécurisées, Paiement confidentiel, Options de paiement, Paiement sécurisé, Transaction
                  en ligne, Achat sécurisé, Paiement par carte, Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile, Paiement fluide,
                  Expérience de paiement, Le Pit Shop."
            />
            <Stepper step={2}/>
            <div className="section paypal-container">
                <PayPalButtons createOrder={creatingOrder} onApprove={onApprove} onError={onError} />
            </div>
        </div>
    );
};

export default PaymentScreen;