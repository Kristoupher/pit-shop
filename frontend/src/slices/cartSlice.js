import { createSlice } from '@reduxjs/toolkit';
import { updateCart} from "../utils/cartUtils";
//State initial
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {} };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //Ajouter un produit au panier
        addToCart(state, action) {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        //Supprimer un produit du panier
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        //Enregistrer l'adresse de livraison
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        //Vider le panier
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;