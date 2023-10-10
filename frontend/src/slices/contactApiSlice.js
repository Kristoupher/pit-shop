import {CONTACT_URL} from "../constants";
import { apiSlice} from "./apiSlice";

//Requête pour envoyer un email
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (data) => ({
                url: `${CONTACT_URL}`,
                credentials: "include",
                method: "POST",
                body: data,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Contact'],
        }),
    }),
});

export const { useSendEmailMutation } = productsApiSlice;