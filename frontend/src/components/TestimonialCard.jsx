const TestimonialCard = ({ image, name, title, description}) => {
  return (
    <div className="p-8 bg-light-golden border border-gray-100 shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10">
      <div className="flex gap-4 items-start">
        <img className="w-12 h-12 object-cover rounded-full" src={image} alt="user avatar" width="400" height="400" loading="lazy" />
        <div className="flex-1 flex justify-between items-start">
          <div>
            <h6 className="text-lg font-medium text-gray-700">{name}</h6>
              <p className="text-sm text-gray-500">{title}</p>
          </div>
          <a href="#" className="text-blue-500 hover:text-blue-600 ml-4">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
      <p className="mt-8">{description}</p>
    </div>
  )
}
export default TestimonialCard