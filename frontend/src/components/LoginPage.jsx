import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login , currentUser, loading} = useUserStore();

  // sign in
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // navigate to home page if already logged in
  if (loading) return <div>Loading...</div>;
  if (currentUser) return <Navigate to="/" />;
  return (
    <div>
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 border-2">
          <h2 className="text-xl text-center font-semibold mb-4">
            Please Login
          </h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
            </div>
            <div>
              <button className="w-full bg-primary/70 hover:bg-primary text-white font-bold py-2 px-8 rounded focus:outline-none">
                Login{" "}
              </button>
            </div>
          </form>
          <p className="align-baseline text-center font-medium mt-4 text-sm">
            Haven't an account? Please{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:text-blue-700"
            >
              Register
            </Link>
          </p>
          <p className="mt-5 text-center text-gray-500 text-xs">
            ©2025 Ambar Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
