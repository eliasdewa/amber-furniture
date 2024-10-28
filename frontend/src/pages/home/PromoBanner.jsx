const PromoBanner = () => {
  return (
    <section className="max-w-[900px] mx-[auto] flex gap-4 sm:gap-8 p-4 sm:p-8 mt-4 sm:mt-8">
      <div className="text-center">
        <span className="mb-4 inline-block text-4xl text-[#ed3849]"><i className="ri-truck-line"></i></span>
        <h4 className="mb-2 text-xl text-[#0f172a]">Free Delivery</h4>
        <p className="text-[#64748b]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maxime?</p>
      </div>
      <div className="text-center">
        <span className="mb-4 inline-block text-4xl text-[#ed3849]"><i className="ri-money-dollar-circle-line"></i></span>
        <h4 className="mb-2 text-xl text-[#0f172a]">100% Money Back Guaranty</h4>
        <p className="text-[#64748b]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maxime?</p>
      </div>
      <div className="text-center">
        <span className="mb-4 inline-block text-4xl text-[#ed3849]"><i className="ri-user-voice-fill"></i></span>
        <h4 className="mb-2 text-xl text-[#0f172a]">Strong support</h4>
        <p className="text-[#64748b]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maxime?</p>
      </div>
    </section>
  )
}
export default PromoBanner