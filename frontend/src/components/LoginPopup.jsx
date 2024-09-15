import { useForm } from "react-hook-form";
import { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
const LoginPopup = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                    placeholder="Your name"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    {...register("text")}
                  />
                </div>
              </>
            )}
            {/* email */}
            <div className="form-control flex-row items-center justify-center gap-2">
              <CiMail className="w-8 h-16" />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("email")}
              />
            </div>
            {/* password */}
            <div className="form-control flex-row items-center justify-center gap-2">
              <CiLock className="w-8 h-16" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("password")}
              />
            </div>
            {/* login btn */}
            <div className="form-control mt-4">
              <button className="btn bg-green text-white">
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
