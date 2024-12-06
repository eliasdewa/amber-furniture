import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  // Get all products
  getAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  // get a single product
  getSingleProduct: async (productId) => {
    product: null;
    set({ loading: true, error: null });
    try {
      const res = await axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((res) => res.json());
      set({ product: res, loading: false });
    } catch (error) {
      set({ error: "Failed to get a product", loading: false });
      toast.error(error.response.data.error || "Failed to get a product");
    }
  },
  // create product
  createProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("http://localhost:5000/api/products/create-product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // For file uploads
        },
      });

      set((state) => ({
        products: [...state.products, response.data], // Add the new product to the store
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Product created unsuccessful");
    }
  },
  // Delete a product
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success(res.data.message || "Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },
  updateProduct: async (productId, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // For file uploads
          },
        }
      );

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? response.data : product
        ),
        loading: false,
      }));
			toast.success(response.data.message || "Product updated successfully");
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
