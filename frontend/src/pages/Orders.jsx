import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";

const Orders = () => {
  const { ProductItems } = useContext(ShopContext);
  return (
    <div className="pt-16">
      <div className="text-2xl">
        <Title topic={'My Orders'}/>
      </div>
      <div>
        {
          ProductItems.slice(1, 4).map((item, index) => (
            <div key={index} className="border-t py-4 border-b text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">${item.newPrice}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className="mt-2">Date: <span className="text-gray-400">20, October 2024</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green"></p>
                  <p>Ready to ship</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Orders