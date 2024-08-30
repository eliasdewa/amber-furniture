import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoMdArrowDropright } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

const Products = () => {
  // Get the data of all products using context api
  const { ProductItems } = useContext(ShopContext);
  // State variable
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Toggle function main category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Filter out the selected category
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  // Toggle function for sub-category
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Filter out the selected category
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }
  // Apply filter
  const applyFilter = () => {
    // Make a copy of all products
    let productItemsCopy = ProductItems.slice()
    if (category.length > 0) {
      productItemsCopy = productItemsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productItemsCopy = productItemsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productItemsCopy)
  };
  // To show all products
  // useEffect(() => {
  //   setFilterProducts(ProductItems);
  // }, []);

  // To filter out all products based on category
  // useEffect(() => {
  //   console.log(category)
  // }, [category]);
  // useEffect(() => {
  //   console.log(subCategory)
  // }, [subCategory]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory])
  return (
    <div className="px-2 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onChange={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters{" "}
          <span>
            <IoMdArrowDropright
              className={`sm:hidden ${showFilter ? "rotate-90" : ""}`}
            />
          </span>
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Home"} onChange={toggleCategory} />
              Home Furniture
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bedroom"} onChange={toggleCategory} />
              Bedroom Furniture
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Dining"} onChange={toggleCategory} />
              Dinning Furniture
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Cafe"} onChange={toggleCategory} />
              Cafe Furniture
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Office"} onChange={toggleCategory} />
              Office Furniture
            </p>
          </div>
        </div>
        {/* Sub-category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Chairs"} onChange={toggleSubCategory} />
              Chairs
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Tables"} onChange={toggleSubCategory} />
              Tables
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Sofa and Couch"} onChange={toggleSubCategory} />
              Sofa and Couch
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Beds"} onChange={toggleSubCategory} />
              Beds
            </p>
          </div>
        </div>
      </div>
      {/* Right side part */}
      <div className="flex-1">
        <div className="flex justify-between text-base mb-4">
          <h3 className="text-xl font-bold">All Products</h3>
          {/* Product Sort */}
          <div className="flex">
            <div className="bg-black p-2">
              <FaFilter className="text-white" />
            </div>
            <select
              id="sort"
              className="bg-black text-white text-sm border-2 p-2 rounded-sm"
            >
              <option value="relevent">Relevent</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-2">
          {filterProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              id={product._id}
              img={product.img}
              title={product.title}
              prevPrice={product.prevPrice}
              newPrice={product.newPrice}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
