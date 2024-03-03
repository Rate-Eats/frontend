import RestaurantDetails from '@pages/restaurant/components/RestaurantDetails.tsx';
import RestaurantMenus from '@pages/restaurant/components/RestaurantMenus.tsx';
import ReviewRatings from '@pages/restaurant/components/ReviewRatings.tsx';
import RestaurantSkeleton from '@pages/restaurant/RestaurantSkeleton.tsx';
import { getRestaurant } from '@pages/restaurant/utils/getRestaurant.ts';
import ImageSlider from '@pages/restaurant/components/ImageSlider.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Restaurant = () => {
  const { id } = useParams();

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
  });

  if (isFetching) return <RestaurantSkeleton />;
  if (error || !data) return <div>Something went wrong</div>;
  return (
    <div className="mx-auto mt-5 flex w-full max-w-screen-xl flex-col justify-center gap-5">
      <ImageSlider images={data.attributes.images.filter((image) => !image.menu)} />
      <RestaurantDetails restaurantData={data} />
      <RestaurantMenus images={data.attributes.images.filter((image) => image.menu)} />
      <ReviewRatings restaurantData={data} />
    </div>
  );
};

export default Restaurant;
