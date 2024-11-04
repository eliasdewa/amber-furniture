import { Link } from "react-router-dom";

import category1 from "/category/home.jpg";
import category2 from "/category/office.jpg";
import category3 from "/category/cafe.jpg";
import category4 from "/category/bedroom.jpg";
import category5 from "/category/dining.jpg";

const Category = () => {
  const categories = [
    { name: "Home Furniture", path: "home", image: category1 },
    { name: "Office Furniture", path: "office", image: category2 },
    { name: "Cafe Furniture", path: "cafe", image: category3 },
    { name: "Bedroom Furniture", path: "bedroom", image: category4 },
    { name: "Kitchen Furniture", path: "dining", image: category5 },
  ];
  return (
    <section className="p-4 sm:p-8 mt-4">
      <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold sm:text-center">
        Popular Categories
      </h2>
      <p className="w-full m-auto sm:text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <div className="mx-auto mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {categories.map((category) => (
          <div key={category.path}>
            <Link to={`/categories/${category.path}`} className="text-center">
              <img
                src={category.image}
                alt={category.name}
                className="h-40 w-40 rounded-full object-cover mx-auto"
              />
              <h4 className="mt-4 text-xl font-bold text-[#0f172a]">
                {category.name}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Category;
