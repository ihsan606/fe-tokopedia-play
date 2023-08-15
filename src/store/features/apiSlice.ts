import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_BE
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Comment'],
    endpoints: (builder) => ({}),
})