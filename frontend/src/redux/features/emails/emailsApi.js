import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emailsApi = createApi({
  reducerPath: "emailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/emails",
    credentials: "include",
  }),
  tagTypes: ["Emails"],
  // define endpoint
  endpoints: (builder) => ({
    // create a new email
    sendEmailSubscription: builder.mutation({
      query: (email) => ({
        url: "/subscribe",
        method: "POST",
        body: {email},
        credentials: "include",
      }),
    }),
  }),
});

export const { useSendEmailSubscriptionMutation } = emailsApi;

export default emailsApi;
