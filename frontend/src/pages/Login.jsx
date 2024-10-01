import { useContext, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { backendUrl, setToken } = useContext(ShopContext);
  // Check if the user data stored
  // useEffect(() => {
  //   console.log(data)
  // }, [data]);
  // create  a state variable to store user information
  // Initialize the input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = backendUrl;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      await axios
      .post(
        newUrl,
        { name, email, password }
      )
      .then((response) => {
        // Clear input fields
        setName("");
        setEmail("");
        setPassword("");
        toast.success(response.data.message);
        // send the token
        setToken(response.data.token);
        // save the token on local storage
        localStorage.setItem("token", response.data.token);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='flex justify-center'>
      <div className="w-1/3 flex flex-col justify-center my-10 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="card-body py-4"
          method="dialog"
        >
          <h3 className="text-gray-800 text-xl text-center pb-4 font-bold sm:text-2xl">
            {currentState === "Login" ? (
              <>
                Welcome Back
                <br />
                Login
              </>
            ) : (
              <>
                Welcome to Ambar Furniture
                <br />
                Sign Up
              </>
            )}
          </h3>

          {currentState === "Login" ? (
            <></>
          ) : (
            <>
              {/* name */}
              <div className="form-control flex-row items-center justify-center gap-2">
                <CiUser className="w-8 h-16" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Your name"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </>
          )}
          {/* email */}
          <div className="form-control flex-row items-center justify-center gap-2">
            <CiMail className="w-8 h-16" />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* password */}
          <div className="form-control flex-row items-center justify-center gap-2">
            <CiLock className="w-8 h-16" />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {currentState === "Login" ? (
            <>
              {/* login btn */}
              <button className="btn w-56 mx-auto mt-2 bg-green text-white hover:scale-105">
                Login
              </button>
              <p className="text-center my-2">
                Don't have an account?{" "}
                <button
                  onClick={() => setCurrentState("Sign Up")
                  }
                  className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                >
                  Sign Up Now
                </button>{" "}
              </p>
            </>
          ) : (
            <>
              {/* Sign up btn */}
              <button className="btn w-56 mx-auto mt-2 bg-green text-white hover:scale-105">
                Create account
              </button>
              <p className="text-center my-2">
                Already have an account?
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                  onClick={() => setCurrentState("Login")}
                >
                  Login
                </button>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
