import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import axios from "axios";

export const useUserStore = create(
  persist(
    (set) => ({
      users: [],
      currentUser: null,
      loading: false,
      token: localStorage.getItem("token") || null, // Authentication token
      isAuthenticated: false, // Authentication status

      setUsers: (users) => set({ users }),
      // get all the users
      getAllUsers: async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/users");
          set({ users: res.data.users });
        } catch (error) {
          console.log(error);
        }
      },
      // delete a user
      deleteUser: async (userId) => {
        try {
          await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
          set((prevUsers) => ({
            users: prevUsers.users.filter((user) => user._id !== userId),
            loading: false,
          }));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error(error.message);
          toast.error("Failed to delete user");
        }
      },
      // Sign up
      signup: async (username, email, password) => {
        set({ loading: true });

        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/register",
            { username, email, password },
            {
              withCredentials: true,
            }
          );
          const { token, user } = res.data;

          // Store token in local storage
          localStorage.setItem("token", token);

          // Update Zustand state
          set({
            currentUser: user,
            token,
            isAuthenticated: true,
            loading: false,
          });
          toast.success("User registered successfully");
        } catch (error) {
          set({ loading: false });
          toast.error("Failed to register user");
        }
      },
      // Login
      login: async (email, password) => {
        set({ loading: true });

        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            { email, password },
            {
              withCredentials: true,
            }
          );
          const { token, user } = res.data;

          // Store token in local storage
          localStorage.setItem("token", token);
          set({
            currentUser: user,
            token,
            isAuthenticated: true,
            loading: false,
          });
          toast.success("User logged in successfully");
        } catch (error) {
          set({ loading: false });
          toast.error("Invalid credentials");
        }
      },
      logout: async () => {
        // Clear token from local storage
        localStorage.removeItem("token");

        try {
          await axios.post("http://localhost:5000/api/auth/logout");
          // Clear Zustand state
          set({
            currentUser: null,
            token: null,
            isAuthenticated: false,
          });
          toast.success("User logged out successfully");
        } catch (error) {
          console.error(error.message);
          toast.error("Failed to log out user");
        }
      },
      // Restore authentication state from local storage
      restoreAuthState: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({
            token,
            isAuthenticated: true,
          });

          // Optionally fetch user details if needed
          // set({ user: fetchedUserData });
        }
      },
      // Update user profile
      updateUser: async (formData) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }
    
          const res = await axios.put(
            "http://localhost:5000/api/auth/update-profile",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // For file uploads
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { user } = res.data;
          // Update user in Zustand state
          set({ currentUser: user });
          toast.success("User profile updated successfully");
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile:", error);
        }
      },
    }),
    {
      name: "auth-storage", // Key for localStorage
    }
  )
);
