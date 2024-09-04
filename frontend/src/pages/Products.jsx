import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoMdArrowDropright, IoMdSearch } from "react-icons/io";
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
  const [sortType, setSortType] = useState("relevent");

  // Search functionality
  const [search, setSearch] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem);
  // Pagination functionality
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle function main category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Filter out the selected category
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
    setCurrentPage(1);
  };
  // Toggle function for sub-category
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Filter out the selected category
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
    setCurrentPage(1);
  };
  // Apply filter
  const applyFilter = () => {
    // Make a copy of all products
    let productItemsCopy = ProductItems.slice();
    if (search) {
      productItemsCopy = productItemsCopy.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productItemsCopy = productItemsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productItemsCopy = productItemsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productItemsCopy);
    setCurrentPage(1);
  };
  // To sort products by category
  const sortProducts = () => {
    // copy the filtered products
    let filteredProducts = filterProducts.slice();
    switch (sortType) {
      case "A-Z":
        setFilterProducts(
          filteredProducts.sort((a, b) => (a.title > b.title ? 1 : -1))
        );
        break;
      case "Z-A":
        setFilterProducts(
          filteredProducts.sort((a, b) => (a.title < b.title ? 1 : -1))
        );
        break;
      case "low-to-high":
        setFilterProducts(
          filteredProducts.sort((a, b) => a.newPrice - b.newPrice)
        );
        break;
      case "high-to-low":
        setFilterProducts(
          filteredProducts.sort((a, b) => b.newPrice - a.newPrice)
        );
        break;
      default:
        applyFilter();
        break;
    }
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
  }, [category, subCategory, search]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="px-2 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
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
              <input
                className="w-3"
                type="checkbox"
                value={"Home"}
                onChange={toggleCategory}
              />
              Home Furniture
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bedroom"}
                onChange={toggleCategory}
              />
              Bedroom Furniture
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Dining"}
                onChange={toggleCategory}
              />
              Dinning Furniture
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Cafe"}
                onChange={toggleCategory}
              />
              Cafe Furniture
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Office"}
                onChange={toggleCategory}
              />
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
              <input
                className="w-3"
                type="checkbox"
                value={"Chairs"}
                onChange={toggleSubCategory}
              />
              Chairs
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Tables"}
                onChange={toggleSubCategory}
              />
              Tables
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Sofa and Couch"}
                onChange={toggleSubCategory}
              />
              Sofa and Couch
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Beds"}
                onChange={toggleSubCategory}
              />
              Beds
            </p>
          </div>
        </div>
      </div>
      {/* Right side part */}
      <div className="flex-1">
        <h3 className="text-2xl font-extrabold mb-4 text-center">
          All Products
        </h3>
        <div className="flex justify-between gap-2 text-base mb-4">
          {/* Search input */}
          <div className="flex items-center justify-center border border-gray-400 px-3 py-2 rounded-full w-3/5 sm:w-4/5">
            <input
              type="text"
              placeholder="Search..."
              className="md:flex-1 outline-none bg-inherit text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoMdSearch size={30} className="cursor-pointer hover:scale-105" />
          </div>
          {/* Product Sort */}
          <div className="flex">
            <div className="bg-black hidden md:flex p-2 ">
              <FaFilter className="text-white" />
            </div>
            <select
              id="sort"
              className="bg-black text-white text-sm border-2 p-2 rounded-sm"
              onChange={(e) => setSortType(e.target.value)}
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
          {currentItems.map((product, idx) => (
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
        {/* Pagination */}
        <div className="flex justify-center my-8 gap-2">
          {Array.from({
            length: Math.ceil(filterProducts.length / itemsPerPage),
          }).map((_, idx) => (
            <button key={idx + 1} onClick={() => paginate(idx + 1)} className={`px-3 py-1 rounded-full ${currentPage === idx + 1 ? "bg-green text-white" : "bg-gray-200" }`}>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
