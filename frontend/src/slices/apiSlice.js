import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL} from "../constants";
//Permet de faire des requêtes à l'API
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category', 'Contact', 'Upload'],
    endpoints: (builder) => ({})
});