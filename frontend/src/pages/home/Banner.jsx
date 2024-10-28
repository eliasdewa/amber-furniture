import { Link } from 'react-router-dom'
import bannerImage from '/bannerImg.jpg';
const Banner = () => {
  return (
    <div className='bg-[#f4e5ec] rounded-bl-2xl rounded-br-2xl flex gap-8 items-center p-4 sm:p-8'>
      {/* Content */}
      <div className='w-full sm:max-w-[600px] ml-auto z-30'>
        <h4 className='text-lg sm:text-xl font-medium text-[#ed3849] mb-2'>UP TO 20% DISCOUNT ON</h4>
        <h1 className='lg:text-6xl md:text-4xl sm:text-2xl text-xl font-extrabold mb-4'>Luxury Furniture</h1>
        <p className='mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eveniet accusantium laboriosam blanditiis repellat numquam libero nostrum. In, ad nulla.</p>
        <button className='btn'><Link to='/products'>Explore Now</Link></button>
      </div>
      {/* Image */}
      <div className='hidden sm:flex h-full w-4/5 m-auto'>
        <img src={bannerImage} alt="banner image" />
      </div>
    </div>
  )
}
export default Banner