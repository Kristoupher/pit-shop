import Stepper from "../components/Stepper";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCreateOrderMutation, useGetPayPalClientIdQuery } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const PaymentScreen = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [ createOrder, { isLoading, error } ] = useCreateOrderMutation();

const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(state => state.cart);

const { userInfo } = useSelector(state => state.auth);

const { data: paypal, isLoading: loadingPayPal, error: errorPayPal  } = useGetPayPalClientIdQuery();

const dataOrder = {
    orderItems: cartItems,
    user: userInfo._id,
    shippingAddress: userInfo.address,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
}

console.log(userInfo._id);

const addOrder = async () => {
    try {
        const res = await createOrder(dataOrder).unwrap();
        dispatch(clearCartItems());
    } catch (err) {
        toast.error(err?.data?.message || err.message);
    }
}


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

    function onError(err) {
        toast.error(err.message);
    }

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
            <Stepper step={2}/>
            <div className="section paypal-container">
                <PayPalButtons createOrder={creatingOrder} onApprove={onApprove} onError={onError} />
            </div>
        </div>
    );
};

export default PaymentScreen;