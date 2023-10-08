import {PRODUCTS_URL, UPLOAD_URL} from "../constants";
import { apiSlice} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (keyword) => ({
                url: `${PRODUCTS_URL}/search/${keyword}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getLastProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/last`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategory: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategoryPriceAsc: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}/price/asc`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategoryPriceDesc: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}/price/desc`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getTeams: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/teams/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getDrivers: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/drivers/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getTypes: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/types/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getSizes: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/sizes/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
                credentials: "include",
            }),
        }),
        deleteProductImage: builder.mutation({
            query: (fileName) => ({
                url: `${UPLOAD_URL}/${fileName}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['Products'],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {  useGetProductsQuery,
                useGetLastProductsQuery,
                useGetProductsByCategoryQuery,
                useGetProductsByCategoryPriceAscQuery,
                useGetProductsByCategoryPriceDescQuery,
                useGetTeamsQuery,
                useGetDriversQuery,
                useGetTypesQuery,
                useGetSizesQuery,
                useGetProductDetailsQuery,
                useUpdateProductMutation,
                useUploadProductImageMutation,
                useDeleteProductImageMutation,
                useDeleteProductMutation,
                useCreateProductMutation
                } = productsApiSlice;