import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/orders",
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  // define endpoint
  endpoints: (builder) => ({
    // create a new order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
    }),
    // create an order by email address
    getOrderByEmail: (builder.query)({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;

export default ordersApi;
