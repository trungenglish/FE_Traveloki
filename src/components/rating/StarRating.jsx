import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          onClick={() => setRating(star)}
          className={`cursor-pointer ${
            rating >= star ? "text-yellow-500" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
};
