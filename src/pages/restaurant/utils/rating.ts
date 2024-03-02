import { Ratings } from '@pages/restaurant/interfaces/restaurant.ts';

export const calculateRating = (ratings: Ratings) => {
  const calculation =
    ratings.data.reduce((sum, { attributes }) => {
      const { rating_ambience, rating_food, rating_service, rating_price } = attributes;
      const ratingSum = rating_ambience + rating_food + rating_service + rating_price;
      return sum + ratingSum / 4;
    }, 0) / ratings.data.length;

  return !isNaN(calculation) ? calculation : 0;
};
