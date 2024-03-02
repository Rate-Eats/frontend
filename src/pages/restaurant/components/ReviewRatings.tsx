import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import { calculateRating } from '@pages/restaurant/utils/rating.ts';
import Stars from '@components/rating/Stars.tsx';
import React from 'react';

interface ReviewRatingsProps {
  restaurantData: RestaurantData;
}
const ReviewRatings = ({ restaurantData }: ReviewRatingsProps) => {
  const {
    attributes: { ratings },
  } = restaurantData;

  const averageRating = calculateRating(ratings);
  const ratingsCount = ratings.data.length;

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Reviews and Ratings</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <div className="flex gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-gray-500">Overall Rating & Reviews</span>
          <span className="text-6xl text-primary">{averageRating.toFixed(1)}</span>
          <Stars rating={averageRating} />
          <div className="flex gap-1 text-gray-500">
            Based on {ratingsCount} reviews
            <span className="cursor-pointer text-primary underline">Rate now</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ReviewRatings;
