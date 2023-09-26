import { PRODUCTS_URL } from "../constants";
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
                useGetProductDetailsQuery
                } = productsApiSlice;