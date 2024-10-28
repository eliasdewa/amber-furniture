import { useState } from "react";

const ProductsFiltering = ({
  filters,
  filterState,
  setFilterState,
  clearFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="space-y-5 flex-shrink-0">
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="my-2 text-xl flex items-center cursor-pointer gap-2"
      >
        Filters{" "}
        <span className="block sm:hidden">
          {showFilter ? (
            <i className="ri-arrow-down-s-fill"></i>
          ) : (
            <i className="ri-arrow-right-s-fill"></i>
          )}
        </span>
      </p>
      <div className={`sm:block ${showFilter ? "" : "hidden"}`}>
        {/* Category */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
          {filters.categories.map((category) => (
            <label key={category} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="category"
                id="category"
                checked={filterState.category === category}
                onChange={(e) =>
                  setFilterState({ ...filterState, category: e.target.value })
                }
                value={category}
              />
              <span className="ml-1">{category}</span>
            </label>
          ))}
        </div>
        {/* Colors */}
        <div className="flex flex-col space-y-2 mt-4">
          <h4 className="font-medium text-lg">Colors</h4>
          <hr />
          {filters.colors.map((color) => (
            <label key={color} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="color"
                id="color"
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState({ ...filterState, color: e.target.value })
                }
                value={color}
              />
              <span className="ml-1">{color}</span>
            </label>
          ))}
        </div>
        {/* Pricing */}
        <div className="flex flex-col space-y-2 mt-4">
          <h4 className="font-medium text-lg">Price Ranges</h4>
          <hr />
          {filters.priceRanges.map((range) => (
            <label key={range.label} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                id="priceRange"
                value={`${range.min}-${range.max}`}
                checked={filterState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) =>
                  setFilterState({ ...filterState, priceRange: e.target.value })
                }
              />
              <span className="ml-1">{range.label}</span>
            </label>
          ))}
        </div>
        {/* Clear Filters */}
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="w-1/2 sm:w-full bg-primary/70 hover:bg-primary text-white py-1 px-4 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductsFiltering;
