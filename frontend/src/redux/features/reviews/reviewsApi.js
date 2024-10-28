import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/reviews",
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  // define some endpoint
  endpoints: (builder) => ({
    // post reviews
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    // get reviews count
    getReviewsCount: builder.query({
      query: () => ({
        url: "/total-reviews",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    // get review by user Id
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      invalidatesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewsApi;

export default reviewsApi;
