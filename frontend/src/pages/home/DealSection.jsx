import dealsImg from "/deals.jpg";
const DealSection = () => {
  return (
    <section className="p-4 sm:p-8 mt-4">
      <div className="bg-[#f4e5ec] rounded-bl-2xl rounded-br-2xl flex flex-col lg:flex-row gap-8 items-center p-4 sm:p-8 mt-4 sm:mt-8">
        <div className="h-full w-full m-auto">
          <img src={dealsImg} alt="deals image" />
        </div>
        <div className="w-full lg:max-w-[600px] mr-auto">
          <h5 className="mb-4 text-3xl font-extrabold">
            Exclusive Deals: Get Up To 20% Discount
          </h5>
          <p className="mb-4 text-xl font-medium text-[#eed3849]">
            Check out our latest deals.
          </p>
          <p className="mb-8 text-[#64748b]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
            ab debitis sunt. Aspernatur placeat iusto esse molestiae
            necessitatibus culpa. Vel.
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
            <div className="h-[80px] w-[80px] grid place-content-center text-center rounded-[100%] [box-shadow:5px_5px_20px_rgba(0,_0,_0,_0.1)] bg-white">
              <h4 className="mb-0 text-xl text-[#0f172a]">14</h4>
              <p className="mb-0 text-lg text-[#0f172a] font-medium">Days</p>
            </div>
            <div className="h-[80px] w-[80px] grid place-content-center text-center rounded-[100%] [box-shadow:5px_5px_20px_rgba(0,_0,_0,_0.1)] bg-white">
              <h4 className="mb-0 text-xl text-[#0f172a]">20</h4>
              <p className="mb-0 text-lg text-[#0f172a] font-medium">Hrs</p>
            </div>
            <div className="h-[80px] w-[80px] grid place-content-center text-center rounded-[100%] [box-shadow:5px_5px_20px_rgba(0,_0,_0,_0.1)] bg-white">
              <h4 className="mb-0 text-xl text-[#0f172a]">15</h4>
              <p className="mb-0 text-lg text-[#0f172a] font-medium">Mins</p>
            </div>
            <div className="h-[80px] w-[80px] grid place-content-center text-center rounded-[100%] [box-shadow:5px_5px_20px_rgba(0,_0,_0,_0.1)] bg-white">
              <h4 className="mb-0 text-xl text-[#0f172a]">05</h4>
              <p className="mb-0 text-lg text-[#0f172a] font-medium">Secs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DealSection;
