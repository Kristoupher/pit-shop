import { CATEGORIES_URL } from "../constants";
import { apiSlice} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: CATEGORIES_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Category'],
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `${CATEGORIES_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = productsApiSlice;