import { useState } from 'react';
import { CiLock, CiMail } from "react-icons/ci";
import axios from "axios";
import { toast } from 'react-toastify';

// Our backend URL
const url = 'http://localhost:5000';
export default function Login({setToken}) {
	// Initialize the input
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Api call
      const response = await axios.post(`${url}/api/user/admin`, {email, password})
      // console.log(response);
      if (response.data.success) {
        // And redirect to the dashboard page
        setToken(response.data.token);
      } else {
        // If failure, show an error message
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };
	return (
		<div className='min-h-screen'>
			<section className='flex gap-2 max-w-4xl mx-auto p-10'>
				{/* Lefts side */}
				<section className='relative w-1/3 items-center flex-col gap-3 container mx-auto'>
					<img
						alt=''
						src='/furniture.jpg'
						className='absolute inset-0 h-full w-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-xl'
					/>
				</section>
				{/* Right side */}
				<div className='w-2/3 items-center flex-col gap-3 container mx-auto p-4 shadow-2xl rounded-tr-3xl rounded-br-3xl'>
					<h1 className='text-center text-2xl sm:text-3xl font-semibold pb-2'>
						Admin Panel
					</h1>
					<p className='text-center font-semibold pb-4'>Login to your account</p>
					<form onSubmit={onSubmitHandler} className="card-body py-4">
						{/* email */}
            <div className="flex items-center justify-center gap-2">
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
            <div className="flex items-center justify-center gap-2">
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
						{/* Confirm Password */}
						{/* <div className="flex items-center justify-center gap-2">
              <CiLock className="w-8 h-16" />
              <input
                type="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div> */}
						{/* login btn */}
            <div className='text-center'>
              <button className="btn w-4/5 px-4 py-2 mt-6 bg-blue-700 text-white rounded-md hover:scale-105">
                Login
              </button>
            </div>
					</form>
				</div>
			</section>
		</div>
	);
}
