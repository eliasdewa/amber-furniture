import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="bg-white">
      <div className="flex items-center justify-center w-3/4 mx-auto my-16 shadow-2xl">
        <section className="hidden lg:block relative items-end bg-gray-900 min-h-[600px] w-3/5">
          <img
            alt=""
            src="/furniture.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="lg:relative lg:block p-6 my-10 mx-auto w-[500px] flex justify-center items-center">
            <a className="block text-white" href="/">
              <img src="/logo.svg" />
            </a>

            <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Welcome to Amber Furniture
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-6 py-4 min-h-[600px]">
          <div>
            <div className="relative my-4 block lg:hidden">
              <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl text-center">
                Welcome to Amber Furniture
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="text-center py-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Create an account</h3>
                <p className="">Already have an account?
                  <button
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                    onClick={() => document.getElementById("my_modal_5").showModal()}
                  >
                    Login
                  </button>
                </p>
              </div>
              {/* name */}
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...register("name")}
                />
              </div>
              {/* email */}
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...register("email")}
                />
              </div>
              {/* password */}
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...register("password")}
                />
              </div>
              {/* sign up btn */}
              <div className="form-control mt-4">
                <input
                  type="submit"
                  value="Create Account"
                  className="btn bg-green text-white"
                />
              </div>
            </form>
            {/* social sign in */}
            <div className="text-center space-x-3 mt-5">
              <button
                className="btn btn-circle hover:bg-green hover:text-white"
              >
                <FaGoogle />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaFacebookF />
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
export default SignUp;
