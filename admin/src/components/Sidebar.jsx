import { FaSitemap } from "react-icons/fa"
import { MdAddCircleOutline, MdFormatListBulleted } from "react-icons/md"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
	return (
		<div className="w-[18%] min-h-screen border border-[#a9a9a9] border-t-0">
			<div className="pt-12 px-4 flex flex-col gap-5">
				<NavLink to='/add' className="flex items-center gap-3 border border-[#a9a9a9] py-2 px-3 rounded-md cursor-pointer">
					<MdAddCircleOutline size={30} />
					<p className="hidden md:block text-sm sm:text-lg">Add Product</p>
				</NavLink>
				<NavLink to='/list' className="flex items-center gap-3 border border-[#a9a9a9] py-2 px-3 rounded-md cursor-pointer">
					<MdFormatListBulleted size={30} />
					<p className="hidden md:block text-sm sm:text-lg">List Products</p>
				</NavLink>
				<NavLink to='/orders' className="flex items-center gap-3 border border-[#a9a9a9] py-2 px-3 rounded-md cursor-pointer">
					<FaSitemap size={30} className="" />
					<p className="hidden md:block text-sm sm:text-lg">Orders</p>
				</NavLink>
			</div>
		</div>
	)
}
export default Sidebar