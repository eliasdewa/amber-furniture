import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/products",
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/create-product`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    // Get all products
    getAllProducts: builder.query({
      query: () => "/",
      providesTags: ["Products"],
    }),
    // Get a product by id
    getSingleProduct: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    // get Related Products by id
    getRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    // Update a product by id
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    // delete product by id
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetRelatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
export default productsApi;
