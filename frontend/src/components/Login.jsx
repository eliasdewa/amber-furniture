import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // for manual sign in
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      // console.log(user)
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Google sign in
  const handleGoogleSignIn = (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user) {
        toast.success("Login successful!");
        navigate("/");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    })
  };
  return (
    <div>
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-700">
              Register
            </Link>
          </p>
          <p className="text-center text-blue-500 font-semibold my-2">---Or continue with---</p>
          {/* google sign in */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex flex-wrap gap-1 items-center justify-center bg-primary/70 hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              <i className="ri-google-fill mr-2"></i>
              Sign in with Google
            </button>
          </div>

          <p className="mt-5 text-center text-gray-500 text-xs">
            ©2025 Ambar Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
