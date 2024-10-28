const TestimonialCard = ({ image, name, title, description }) => {
  return (
    <div className="bg-[#f4e5ec] w-[400px] h-[200px] flex flex-col gap-4 p-4 rounded-md">
      <div className="flex gap-2">
        <div className="size-16 object-cover rounded-lg">
          <img src={image} alt="" className="w-32 rounded-full" />
        </div>
        <div>
          <h6 className="text-lg font-medium text-gray-700">{name}</h6>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <div className="mt-2">{description}</div>
    </div>
  );
};
export default TestimonialCard;
