import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import RestaurantsSkeleton from '@pages/restaurants/RestaurantsSkeleton.tsx';
import { getRestaurants } from '@pages/restaurants/utils/getRestaurants.ts';
import Filter from '@pages/restaurants/components/Filter.tsx';
import { useQuery } from '@tanstack/react-query';

const Restaurants = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getRestaurants(),
    refetchOnWindowFocus: false,
  });
  if (isFetching) return <RestaurantsSkeleton />;
  if (error || !data) return <ErrorFetching errorText={'There was an error loading this restaurant'} />;

  return (
    <div className="max-w-screen-xl mx-auto gap-5 py-6">
      <Filter />
    </div>
  );
};

export default Restaurants;
