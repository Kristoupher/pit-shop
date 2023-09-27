import { apiSlice} from "./apiSlice";
import {ORDERS_URL, PAYPAL_URL} from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (dataOrder) => ({
                url: ORDERS_URL,
                method: "POST",
                body: dataOrder
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/mine/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
    })
});

export const { useCreateOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrderDetailsQuery } = ordersApiSlice;