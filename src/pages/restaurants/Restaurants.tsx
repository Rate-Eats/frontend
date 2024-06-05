import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import RestaurantsSkeleton from '@pages/restaurants/RestaurantsSkeleton.tsx';
import { getRestaurants } from '@pages/restaurants/utils/getRestaurants.ts';
import Filter from '@pages/restaurants/components/Filter.tsx';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const params = {
    search_query: searchParams.get('search_query'),
    categories: searchParams.getAll('category'),
    minimum_rating: searchParams.get('minimum_rating'),
    maximum_rating: searchParams.get('maximum_rating'),
  };

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurants', params],
    queryFn: () => getRestaurants(params),
    refetchOnWindowFocus: false,
  });
  if (isFetching) return <RestaurantsSkeleton />;
  if (error || !data) return <ErrorFetching errorText={'There was an error loading this restaurant'} />;

  return (
    <div className="mx-auto max-w-screen-xl gap-5 py-6">
      <Filter />
    </div>
  );
};

export default Restaurants;
