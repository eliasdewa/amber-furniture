import { useState } from "react";
import { toast } from "react-toastify";
import { useSendEmailSubscriptionMutation } from "../../redux/features/emails/emailsApi";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [sendEmailSubscription, { isLoading }] =
    useSendEmailSubscriptionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmailSubscription(email).unwrap();
      toast.success(response.message);
      setEmail("");
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };
  return (
    <div>
      <h4 className="mb-6 text-[1.2rem] font-extrabold text-gray-900 text-center">
        Subscribe To Get Latest Updates
      </h4>
      <form
        onSubmit={handleSubmit}
        className="w-[60%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1 mb-4"
      >
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-bar w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto py-2 px-8 bg-primary/80 hover:bg-primary text-white rounded"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};
export default EmailSubscription;
