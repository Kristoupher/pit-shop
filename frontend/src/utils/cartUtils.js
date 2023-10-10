//Fonction qui permet d'arrondir les prix à 2 décimales
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

//Fonction qui permet de mettre à jour le panier
export const updateCart = (state) => {
    //     Calculer le prix des articles
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    //    Calculer le prix de livraison (livraison gratuite si le prix des articles > 100)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    //     Calculer le prix de la taxe (20%)
    state.taxPrice = addDecimals(Number((0.20 * state.itemsPrice).toFixed(2)));
    //     Calculer le prix total
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}