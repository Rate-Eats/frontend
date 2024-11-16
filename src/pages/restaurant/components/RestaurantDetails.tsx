import { openGoogleMapAddress } from '@shared/utils/openGoogleMapAddress.ts';
import { calculateRating } from '@pages/restaurant/utils/rating.ts';
import LocationIcon from '@assets/svgs/icons/location.svg?react';
import PriceIcon from '@assets/svgs/icons/dollar.svg?react';
import { Restaurant } from '@shared/types/restaurant.ts';
import { useState } from 'react';

type RestaurantDetailsProps = {
  restaurantData: Restaurant;
};

const RestaurantDetails = ({ restaurantData }: RestaurantDetailsProps) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const { name, description, address, reviews } = restaurantData;

  const rating = reviews ? calculateRating(reviews).totalRating.rating : 0;
  const price = '$$$';

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium text-primary">{name}</span>
        {reviews && (
          <div className="flex gap-2 font-medium">
            {rating.toFixed(1)} Stars | <span className="text-primary underline">{reviews.length} Reviews</span>
          </div>
        )}
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
            <span
              className="cursor-pointer underline transition hover:text-blue-700"
              onClick={() => openGoogleMapAddress(address)}
            >
              {address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
