import { Link } from 'react-router-dom';
const ProductCard = ({ image, name, description }) => {
  return (
    <div className="card bg-light-golden w-full sm:w-72 shadow-xl">
      <figure>
        <Link to='/products'>
          <img
            src={image}
            alt="product image"
          />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title cursor-pointer hover:underline">{name}</h2>
        <p>{description}</p>
        <Link to='/products' className="card-actions justify-start">
          <button className="btn btn-primary">Show More</button>
        </Link>
      </div>
    </div>
  );
};
export default ProductCard;