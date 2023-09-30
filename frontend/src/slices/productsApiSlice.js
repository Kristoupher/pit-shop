import {PRODUCTS_URL, UPLOAD_URL} from "../constants";
import { apiSlice} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URL,
                params: {
                    keyword,
                    pageNumber,
                },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getLastProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/last`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategory: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategoryPriceAsc: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}/price/asc`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsByCategoryPriceDesc: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/category/${id}/price/desc`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getTeams: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/teams/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getDrivers: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/drivers/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getTypes: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/types/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getSizes: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/sizes/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProductImage: builder.mutation({
            query: (fileName) => ({
                url: `${UPLOAD_URL}/${fileName}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data
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