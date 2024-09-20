import { useContext, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
const LoginPopup = () => {
  const [currentState, setCurrentState] = useState("Login");

  // create  a state variable to store user information
  // Initialize the input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if the user data stored
  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  // To close the popup
  const closeModal = () => {
    document.getElementById("my_modal_5").close();
  };

  const { url, setToken } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      await axios
        .post(
          newUrl,
          { name, email, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setToken(res.data.token);
          // save the token on local storage
          localStorage.setItem("token", res.data.token);
          // Clear input fields
          setName("");
          setEmail("");
          setPassword("");
          // Close the form
          closeModal();
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
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
                placeholder="Password"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* login btn */}
            <div className="form-control mt-4">
              <button type="submit" className="btn bg-green text-white">
                {currentState === "Sign Up" ? "Create account" : "Login"}
              </button>
            </div>
            {currentState === "Login" ? (
              <>
                <p className="text-center my-2">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      document.getElementById("my_modal_5").close();
                      setCurrentState("Sign Up");
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                  >
                    Sign Up Now
                  </button>{" "}
                </p>
              </>
            ) : (
              <>
                <p className="text-center my-2">
                  Already have an account?
                  <button
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                    onClick={() => {
                      document.getElementById("my_modal_5").close();
                      setCurrentState("Login");
                      document.getElementById("my_modal_5").showModal();
                    }}
                  >
                    Login
                  </button>
                </p>
              </>
            )}

            <div
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoginPopup;
