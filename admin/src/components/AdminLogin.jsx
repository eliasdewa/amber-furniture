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
        // Store user info as a JSON string
        localStorage.setItem("adminUser", JSON.stringify(adminUser))
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
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-center mb-6">
            Admin Dashboard Login{" "}
          </h2>
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
      </div>
    </>
  );
};

export default AdminLogin;
