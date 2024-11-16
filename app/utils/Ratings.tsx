import React, { FC, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Props = {
  rating: number; // Initial rating value
  //   onRate?: (rating: number) => void; // Optional callback for handling rating updates
};

const Ratings: FC<Props> = ({ rating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleMouseEnter = (index: number) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(0);
  const handleClick = (index: number) => {
    setCurrentRating(index);
    // onRate && onRate(index); // Trigger the callback if provided
  };

  return (
    <div className="flex items-center mr-3">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const starIndex = index + 1;
          return (
            <span
              key={starIndex}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starIndex)}
              className="cursor-pointer"
            >
              {starIndex <= (hoveredRating || currentRating) ? (
                <AiFillStar color="gold" size={20} />
              ) : (
                <AiOutlineStar color="gold" size={20} />
              )}
            </span>
          );
        })}
      {/* <p className="ml-2 text-sm font-medium text-gray-700">
        {currentRating} / 5
      </p> */}
    </div>
  );
};

export default Ratings;
