const Navbar = ({setToken}) => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%]">
      <img src="/ambar.png" alt="logo" className="w-16 h-16" />
      <button className="bg-gray-500 text-white px-5 py-2 sm:px-7 rounded-full" onClick={() => setToken('')}>Logout</button>
    </div>
  )
}
export default Navbar;