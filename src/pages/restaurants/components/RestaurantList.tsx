import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import React from 'react';
import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import RestaurantsSkeleton from '@pages/restaurants/RestaurantsSkeleton.tsx';

interface RestaurantList {
  data: RestaurantData[] | undefined;
  isFetching: boolean;
}
const RestaurantList = ({ data, isFetching }: RestaurantList) => {
  if (isFetching) return <RestaurantsSkeleton />;
  if (!data) return <ErrorFetching errorText={'There was an error loading this restaurant'} />;

  data.map((item) => console.log(item));
  return <div></div>;
};

export default RestaurantList;
