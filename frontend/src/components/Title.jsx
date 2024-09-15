const Title = ({ topic, description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">
        {topic}
      </h1>
      <p>
        {description}
      </p>
    </div>
  );
};
export default Title;
