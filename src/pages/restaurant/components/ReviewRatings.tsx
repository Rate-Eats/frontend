import React from 'react';
import Stars from '@components/rating/Stars.tsx';
import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';

interface ReviewRatingsProps {
  restaurantData: RestaurantData;
}
const ReviewRatings = ({ restaurantData }: ReviewRatingsProps) => {

  const {
    attributes: { ratings },
  } = restaurantData;

  const calculation =
    ratings.data.reduce((sum, { attributes }) => {
      const { rating_ambience, rating_food, rating_service, rating_price } = attributes;
      const ratingSum = rating_ambience + rating_food + rating_service + rating_price;
      return sum + ratingSum / 4;
    }, 0) / ratings.data.length;

  const averageRating = !isNaN(calculation) ? calculation : 0;

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
