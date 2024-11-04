const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`ri-star-${i <= rating ? "fill" : "line"}`}
      ></span>
    );
  }
  return <div className="mb-1 text-xl text-[goldenrod]">{stars}</div>;
};
export default RatingStars;