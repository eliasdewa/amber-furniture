import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";

export const useOrderStore = create((set) => ({
	orders: [],
	loading: false,

	setOrders: (orders) => set({ orders }),
	// Get all orders
	getAllOrders: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("http://localhost:5000/api/orders");
			set({ orders: response.data.orders, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch orders", loading: false });
			toast.error(error.response.data.error || "Failed to fetch orders");
		}
	},
	// create order
	createOrder: async (orderData) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:5000/api/orders/create", orderData);
			set((prevState) => ({
				orders: [...prevState.orders, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
}));
