import { Reviews } from '@pages/restaurant/interfaces/restaurant.ts';

type RatingCategory = 'rating_ambience' | 'rating_food' | 'rating_service' | 'rating_price';

const calculateSingleRating = (reviews: Reviews, category: RatingCategory) => {
  const validRatings = reviews.data.filter((rating) => rating.attributes[category] !== 0);
  const ratingSum = validRatings.reduce((sum, { attributes }) => sum + attributes[category], 0);
  const averageRating = validRatings.length ? ratingSum / validRatings.length : 0;

  return {
    rating: averageRating,
    count: validRatings.length,
  };
};

function calculatePercentage(part: number, whole: number): number {
  return (part / whole) * 100;
}

export const calculateRating = (reviews: Reviews) => {
  const ambience = calculateSingleRating(reviews, 'rating_ambience');
  const food = calculateSingleRating(reviews, 'rating_food');
  const service = calculateSingleRating(reviews, 'rating_service');
  const price = calculateSingleRating(reviews, 'rating_price');
  const ratingLength = [ambience, food, service, price].filter((rating) => rating.count !== 0).length;
  const totalRating = (ambience.rating + food.rating + service.rating + price.rating) / ratingLength;

  return {
    rating_ambience: {
      rating: ambience.rating,
      percentage: calculatePercentage(ambience.rating, 5),
      count: ambience.count,
    },
    rating_food: {
      rating: food.rating,
      percentage: calculatePercentage(food.rating, 5),
      count: food.count,
    },
    rating_service: {
      rating: service.rating,
      percentage: calculatePercentage(service.rating, 5),
      count: service.count,
    },
    rating_price: {
      rating: price.rating,
      percentage: calculatePercentage(price.rating, 5),
      count: price.count,
    },
    rating: {
      rating: totalRating,
      percentage: calculatePercentage(totalRating, 5),
      count: reviews.data.length,
    },
  };
};
