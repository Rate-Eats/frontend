import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import RestaurantList from '@pages/restaurants/components/RestaurantList.tsx';
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
    order: searchParams.get('order'),
  };

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurants', params],
    queryFn: () => getRestaurants(params),
    refetchOnWindowFocus: false,
  });
  if (error) return <ErrorFetching errorText={'There was an error loading this restaurant'} />;

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-3 py-6">
      <Filter />
      <RestaurantList data={data} isFetching={isFetching} />
    </div>
  );
};

export default Restaurants;
