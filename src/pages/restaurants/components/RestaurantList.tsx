import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import RestaurantsSkeleton from '@pages/restaurants/RestaurantsSkeleton.tsx';
import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import ImageSlider from '@shared/components/ImageSlider.tsx';
import Stars from '@components/rating/Stars.tsx';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@shared/ui/badge.tsx';
import React from 'react';

interface RestaurantListProps {
  data: RestaurantData[] | undefined;
  isFetching: boolean;
}

const RestaurantList = ({ data, isFetching }: RestaurantListProps) => {
  const navigate = useNavigate();

  if (isFetching) return <RestaurantsSkeleton />;
  if (!data) return <ErrorFetching errorText="There was an error loading this restaurant" />;

  const redirectToRestaurant = (id: number) => navigate(`/restaurant/${id}`);

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 py-4">
      {data.map((restaurant, index) => {
        const { id, attributes } = restaurant;
        const { name, description, address, images, median_rating, categories } = attributes;

        return (
          <div className="flex gap-5 bg-white p-14" key={id}>
            <div className={`flex-1 ${index % 2 === 1 && 'order-last'}`}>
              <ImageSlider images={images} />
            </div>
            <div className={`flex flex-1 flex-col ${index % 2 === 1 && 'items-end'} mt-8 gap-3`}>
              <span className="cursor-pointer text-2xl" onClick={() => redirectToRestaurant(id)}>
                {name}
              </span>
              <Stars rating={median_rating} />
              <span className="cursor-pointer underline">{address}</span>
              <div className="flex gap-2">
                {categories.data.map((category) => (
                  <Badge variant="secondary" className="h-[24px] cursor-pointer px-3" key={category.id}>
                    {category.attributes.name}
                  </Badge>
                ))}
              </div>
              <span className="mt-4 line-clamp-4 max-h-24 transition-all">{description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantList;
