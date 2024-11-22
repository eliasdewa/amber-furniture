import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	// Get all products
	getAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("http://localhost:5000/api/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	// get a single product
	getSingleProduct: async (productId) => {
		product: null;
		set({ loading: true });
		try {
			const response = await axios.get(`http://localhost:5000/api/products/${productId}`).
			then((res) =>
				res.json()
			)
			set({ product: response, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to get a product");
		}
	},
	// create product
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:5000/api/products/create-product", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
	// Delete a product
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			const res = await axios.delete(`http://localhost:5000/api/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
			toast.success(res.data.message || "Product deleted successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	updateProduct: async (productId, updatedProduct) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`http://localhost:5000/api/products/edit/${productId}`);
			// this will update the isFeatured prop of the product
			set((state) => ({
				products: state.products.map((product) =>
					product._id === productId ? updatedProduct : response.data.product
				),
				loading: false,
			}))
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
}));
