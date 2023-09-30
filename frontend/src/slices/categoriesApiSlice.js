import {CATEGORIES_URL, PRODUCTS_URL, UPLOAD_URL} from "../constants";
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
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORIES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Categories'],
        }),
        uploadCategoryImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/image`,
                method: 'POST',
                body: data,
            }),
        }),
        uploadCategoryBanner: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/banner`,
                method: 'POST',
                body: data,
            }),
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORIES_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategoryImage: builder.mutation({
            query: (fileName) => ({
                url: `${UPLOAD_URL}/image/${fileName}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategoryBanner: builder.mutation({
            query: (fileName) => ({
                url: `${UPLOAD_URL}/banner/${fileName}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORIES_URL}/${data.id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useGetCategoriesQuery,
                useGetCategoryByIdQuery,
                useDeleteCategoryMutation,
                useUploadCategoryImageMutation,
                useUploadCategoryBannerMutation,
                useCreateCategoryMutation,
                useDeleteCategoryImageMutation,
                useDeleteCategoryBannerMutation,
                useUpdateCategoryMutation
                } = productsApiSlice;