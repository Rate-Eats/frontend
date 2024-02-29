import PriceIcon from '@assets/svgs/icons/dollar.svg?react';
import LocationIcon from '@assets/svgs/icons/location.svg?react';
import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import { useState } from 'react';

interface RestaurantDetailsProps {
  restaurantData: RestaurantData;
}

const RestaurantDetails = ({ restaurantData }: RestaurantDetailsProps) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const {
    attributes: { name, description, address, ratings },
  } = restaurantData;

  const averageRating = (
    ratings.data.reduce((sum, { attributes }) => {
      const { rating_ambience, rating_food, rating_service, rating_price } = attributes;
      const ratingSum = rating_ambience + rating_food + rating_service + rating_price;
      return sum + ratingSum / 4;
    }, 0) / ratings.data.length
  ).toFixed(1);

  const price = '₹ 2,000 for 2 | North Indian';

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-medium text-primary">{name}</span>
        <div className="flex gap-2 font-medium">
          {averageRating} Stars | <span className="text-primary underline">{ratings.data.length} Reviews</span>
        </div>
      </div>
      <div
        className={`mt-4 line-clamp-3 max-h-20 transition-all ${showMoreDescription && 'line-clamp-none max-h-full'}`}
        onClick={() => setShowMoreDescription(!showMoreDescription)}
      >
        {description}
      </div>
      <div className="my-5 h-px w-full divide-x  bg-gray-200" />
      <div className="flex flex-col gap-5">
        <div className="flex">
          <div className="flex flex-1 gap-3">
            <PriceIcon />
            <span>{price}</span>
          </div>
          <div className="flex flex-1 gap-3">
            <LocationIcon />
            <span className="cursor-pointer">{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
