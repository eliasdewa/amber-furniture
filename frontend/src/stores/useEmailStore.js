import { create } from "zustand"; // zustand is used for global state management
import { toast } from "react-toastify";
import axios from "axios";

export const useEmailStore = create((set) => ({
	emails: [],
	loading: false,

	setEmails: (emails) => set({ emails }),
	// Get all emails
	getAllEmails: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("http://localhost:5000/api/emails/list");
			set({ emails: response.data.emails, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch emails", loading: false });
			toast.error(error.response.data.error || "Failed to fetch emails");
		}
	},
	// delete a single email
	deleteEmail: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`http://localhost:5000/api/emails/${id}`);
      set((prevEmails) => ({
        emails: prevEmails.emails.filter((email) => email._id !== id),
        loading: false,
      }));
			toast.success(res.data.message || "Email deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
}));

