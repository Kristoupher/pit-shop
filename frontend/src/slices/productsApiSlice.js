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
    }),
});

export const {  useGetProductsQuery,
                useGetLastProductsQuery,
                useGetProductsByCategoryQuery,
                useGetProductsByCategoryPriceAscQuery,
                useGetProductsByCategoryPriceDescQuery,
                } = productsApiSlice;