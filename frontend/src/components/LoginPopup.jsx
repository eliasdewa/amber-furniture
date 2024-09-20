import { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import  axios from "axios";
import { toast } from "react-toastify";
const LoginPopup = () => {
  const [currentState, setCurrentState] = useState("Login");

  // create  a state variable to store user information
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value }));
  };

  // Check if the user data stored
  // useEffect(() => {
  //   console.log(data)
  // }, [data]);
  
  const closeModal = () => {
    document.getElementById("my_modal_5").close();
  };

  const url = 'http://localhost:5000';
  const [token, setToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      // save the token on local storage
      localStorage.setItem('token', response.data.token);
      setData({
        name: "",
        email: "",
        password: "",
      })
      closeModal()
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
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
                    onChange={onChangeHandler} value={data.name}
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
                onChange={onChangeHandler} value={data.email}
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
                onChange={onChangeHandler} value={data.password}
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

            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* social sign in */}
          {/* <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
          </div> */}
        </div>
      </div>
    </dialog>
  );
};

export default LoginPopup;
