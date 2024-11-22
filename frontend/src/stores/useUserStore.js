import { create } from "zustand"; // zustand is used for global state management
import { toast } from "react-toastify";
import axios from "axios";

export const useUserStore = create((set) => ({
	users: [],
	currentUser: null,
	loading: false,
	checkingAuth: true,

	setUsers: (users) => set({ users }),

	// get all the users
	getAllUsers: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      set({ users: response.data.users});
    } catch (error) {
      console.error(error.message);
    }
  },
	// delete a user
	deleteUser: async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
			set((prevUsers) => ({
				users: prevUsers.users.filter((user) => user._id !== userId),
				loading: false,
			}));
			toast.success(res.data.message || "User deleted successfully");
    } catch (error) {
      console.error(error.message);
    }
  },
	signup: async (username, email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("http://localhost:5000/api/auth/register", { username, email, password }, {
				withCredentials: true });
			set({ currentUser: res.data, loading: false });
			toast.success(res.data.message || "User has been registered successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("http://localhost:5000/api/auth/login", { email, password }, {
				withCredentials: true
			});
			set({ currentUser: res.data, loading: false });
			toast.success(res.data.message || "User has been Logged in successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	logout: async () => {
		try {
			const res = await axios.post("http://localhost:5000/api/auth/logout");
			set({ currentUser: null });
			toast.success(res.data.message || "User has been logged out successfully");
		} catch (error) {
			toast.error(error.response?.data.message || "An error occurred during logout");
		}
	},
}));

