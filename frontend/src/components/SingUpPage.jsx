import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const SingUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, currentUser } = useUserStore();
  // console.log(username, email, password);
  // register user
  const onSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };
  // navigate to login page
  if (currentUser) return <Navigate to="/login" />;
  return (
    <div className="max-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 border-2">
        <h2 className="text-xl text-center font-semibold mb-4">
          Please Register Here
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
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
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div>
            <button className="w-full bg-primary/70 hover:bg-primary text-white font-bold py-2 px-8 rounded focus:outline-none">
              Register{" "}
            </button>
          </div>
        </form>
        <p className="align-baseline text-center font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:text-blue-700"
          >
            Login
          </Link>
        </p>
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Ambar Furniture. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SingUpPage;
