import RestaurantDetails from '@pages/restaurant/components/RestaurantDetails.tsx';
import RestaurantMenus from '@pages/restaurant/components/RestaurantMenus.tsx';
import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import AddReviewModal from '@pages/restaurant/components/AddReviewModal.tsx';
import ReviewRatings from '@pages/restaurant/components/ReviewRatings.tsx';
import RestaurantSkeleton from '@pages/restaurant/RestaurantSkeleton.tsx';
import { getRestaurant } from '@pages/restaurant/utils/getRestaurant.ts';
import ImageSlider from '@pages/restaurant/components/ImageSlider.tsx';
import ReviewsList from '@pages/restaurant/components/ReviewsList.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Restaurant = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
    refetchOnWindowFocus: false,
  });

  const handleModalVisibility = (value?: boolean) => {
    setIsModalOpen(value ? value : !isModalOpen);
  };

  if (isFetching) return <RestaurantSkeleton />;
  if (error || !data) return <ErrorFetching errorText={'There was an error loading this restaurant'} />;

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-center gap-5 py-6">
      <ImageSlider images={data.attributes.images.filter((image) => !image.menu)} />
      <RestaurantDetails restaurantData={data} />
      <RestaurantMenus images={data.attributes.images.filter((image) => image.menu)} />
      <ReviewRatings restaurantData={data} handleModalVisibility={handleModalVisibility} />
      <ReviewsList reviews={data.attributes.reviews} handleModalVisibility={handleModalVisibility} />
      <AddReviewModal
        reviews={data.attributes.reviews}
        isModalOpen={isModalOpen}
        handleModalVisibility={handleModalVisibility}
      />
    </div>
  );
};

export default Restaurant;
