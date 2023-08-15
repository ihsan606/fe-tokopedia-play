import { apiSlice } from "./apiSlice";

export interface User {
    id: string;
    username: string;
    role: string;
}

const USERS_URL = 'users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        login:  builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
              }), 
        }),
        logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
              method: 'POST',
            }),
          }),
          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method: 'POST',
              body: data,
            }),
          }),
    }),
})

export const { useLoginMutation } = userApiSlice;