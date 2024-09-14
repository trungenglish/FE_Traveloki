import React, { useState } from 'react'
import {StarRating} from "./StarRating";

export const RatingCar = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log({ rating, feedback });
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 h-[50rem] translate-y-[30%]">
        <h2 className="text-2xl font-bold text-center mb-4">Star Ratings Car in React</h2>
        <StarRating rating={rating} setRating={setRating} />
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="What's your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
          />
          <button
            type="submit"
            className="w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
          >
            Submit
          </button>
        </form>
      </div>
    );
}
