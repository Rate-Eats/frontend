import RestaurantDetails from '@pages/restaurant/components/RestaurantDetails.tsx';
import RestaurantMenus from '@pages/restaurant/components/RestaurantMenus.tsx';
import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import ReviewRatings from '@pages/restaurant/components/ReviewRatings.tsx';
import RestaurantSkeleton from '@pages/restaurant/RestaurantSkeleton.tsx';
import { getRestaurant } from '@pages/restaurant/utils/getRestaurant.ts';
import ImageSlider from '@pages/restaurant/components/ImageSlider.tsx';
import ReviewsList from '@pages/restaurant/components/ReviewsList.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Restaurant = () => {
  const { id } = useParams();

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <RestaurantSkeleton />;
  if (error || !data) return <ErrorFetching />;
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-center gap-5 py-6">
      <ImageSlider images={data.attributes.images.filter((image) => !image.menu)} />
      <RestaurantDetails restaurantData={data} />
      <RestaurantMenus images={data.attributes.images.filter((image) => image.menu)} />
      <ReviewRatings restaurantData={data} />
      <ReviewsList reviews={data.attributes.reviews} />
    </div>
  );
};

export default Restaurant;
