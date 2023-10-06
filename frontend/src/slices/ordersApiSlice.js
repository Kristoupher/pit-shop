import { apiSlice} from "./apiSlice";
import {ORDERS_URL, PAYPAL_URL} from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (dataOrder) => ({
                url: ORDERS_URL,
                method: "POST",
                body: dataOrder,
                credentials: "include",
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/${data.orderId}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        getMyOrders: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/mine/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: "include",
            }),
        }),
        keepUnusedDataFor: 5,
    })
});

export const { useCreateOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrderDetailsQuery, useGetOrdersQuery, useUpdateOrderStatusMutation } = ordersApiSlice;