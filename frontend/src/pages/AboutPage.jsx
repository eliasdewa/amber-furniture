const AboutPage = () => {
  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          About Us
        </h2>
      </section>
      <div className="sm:flex">
        <div className="sm:w-1/2">
          <img src="/about.jpg" className="rounded-3xl shadow-2xl" />
        </div>
        <div className="sm:w-1/2 px-5">
          <h2 className="mb-4 font-bold text-3xl  sm:text-4xl">
            About <span className="text-indigo-600">Our Company</span>
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
            commodi doloremque, fugiat illum magni minus nisi nulla numquam
            obcaecati placeat quia, repellat tempore voluptatum.
          </p>
          <section className="py-6 px-4 mt-4 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold">Mission and Values</h2>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex eveniet veritatis eos culpa nihil? Accusamus sunt ipsa nam dolores animi.
            </p>
            <div className="flex space-x-8 mt-8">
              <div>
                <h3 className="text-xl font-bold">15+</h3>
                <p className="text-gray-700">Designers and Workers</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">25+</h3>
                <p className="text-gray-700">Years of Experience</p>
              </div>
            </div>
          </section>

          <section className="bg-[#f4e5ec] mt-4 py-6 px-4 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt illum molestiae accusantium voluptatum. Cumque autem, id eveniet quo repellat excepturi?
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
export default AboutPage;
