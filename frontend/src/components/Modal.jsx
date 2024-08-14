import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Modal = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl text-center">
            Welcome Back
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body py-4"
            method="dialog"
          >
            <h3 className="text-gray-800 text-xl text-center pb-4 font-bold sm:text-2xl">
              Please Login!
            </h3>

            {/* email */}
            <div className="form-control">
              <label className="font-medium">Email</label>
              <input
                type="email"
                placeholder="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("email")}
              />
            </div>
            {/* password */}
            <div className="form-control">
              <label className="font-medium">Password</label>
              <input
                type="password"
                placeholder="password"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* login btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            <p className="text-center my-2">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
              >
                Sign Up Now
              </Link>{" "}
            </p>

            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
