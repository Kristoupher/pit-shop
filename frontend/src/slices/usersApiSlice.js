import { USERS_URL } from "../constants";
import { apiSlice} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
                credentials: "include",
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        getUsers: builder.query({
           query: () => ({
                url: `${USERS_URL}`,
               credentials: "include",
           }),
            keepUnusedDataFor: 5,
        }),
        getUserById : builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                credentials: "include",
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation  } = usersApiSlice;