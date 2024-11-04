import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/admin/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const adminUser = response.data.adminUser;
      const token = response.data.token;
      const message = response.data.message;
      // console.log(adminUser);
      // console.log(token);
      if (token) {
        // Store user info as a JSON string and token
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("token", token);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("adminUser");
          toast.error("Token has been expired!, Please login again.");
          navigate("/");
        }, 3600 * 1000);
      }
      // console.log(localStorage.getItem("adminUser"));
      // console.log(localStorage.getItem("token"));
      // console.log(message);
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen">
      <section className="flex max-w-3xl mx-auto p-10">
        {/* Lefts side */}
        <section className="relative w-2/5 items-center flex-col gap-3 container mx-auto">
          <img
            alt=""
            src="/ambar.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-xl"
          />
        </section>
        {/* Right side */}
        <div className="w-3/5 items-center flex-col gap-3 container mx-auto p-4 shadow-xl bg-[#d8dada]  rounded-tr-3xl rounded-br-3xl">
          <h2 className="text-xl font-semibold text-center">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-sm my-4">
            Welcome to the Amber Furniture Admin Dashboard. Please login to access
            your account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
            </div>
            {/* password */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
            </div>
            {/* submit btn */}
            <div className="w-full">
              <button
                type="submit"
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
              >
                Login{" "}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray-500 text-xs">
            ©2025 Book Store. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
