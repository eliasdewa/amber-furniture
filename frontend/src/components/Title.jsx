const Title = ({ topic, description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-5">
      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
        {topic}
      </h1>
      <p>
        {description}
      </p>
    </div>
  );
};
export default Title;
