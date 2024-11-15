import RestaurantDetails from '@pages/restaurant/components/RestaurantDetails.tsx';
import RestaurantMenus from '@pages/restaurant/components/RestaurantMenus.tsx';
import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import AddReviewModal from '@pages/restaurant/components/AddReviewModal.tsx';
import ReviewRatings from '@pages/restaurant/components/ReviewRatings.tsx';
import RestaurantSkeleton from '@pages/restaurant/RestaurantSkeleton.tsx';
import { getRestaurant } from '@pages/restaurant/utils/getRestaurant.ts';
import ReviewsList from '@pages/restaurant/components/ReviewsList.tsx';
import ImageSlider from '@shared/components/ImageSlider.tsx';
import { useQuery } from '@tanstack/react-query';
import { Image } from '@shared/types/image.ts';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Restaurant = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { error, data, isFetching } = useQuery({
    queryKey: ['restaurant', { type: 'done' }, id],
    queryFn: () => getRestaurant(id),
    refetchOnWindowFocus: false,
  });

  const handleModalVisibility = () => setIsModalOpen((prev) => !prev);

  if (isFetching) return <RestaurantSkeleton />;
  if (error || !data) return <ErrorFetching errorText={'There was an error.ts loading this restaurant'} />;

  const menuImages: Image[] = [];
  const images: Image[] = [];
  data?.images?.forEach((image) => {
    image.alternativeText?.includes('menu') ? menuImages.push(image) : images.push(image);
  });

  return (
    <div className="flex h-full w-full justify-center">
      <div className="mx-4 flex w-full max-w-screen-xl flex-col justify-center gap-5 py-6">
        {images.length > 0 && (
          <div className="h-[350px] w-full ">
            <ImageSlider images={images} size={'large'} />
          </div>
        )}
        <RestaurantDetails restaurantData={data} />
        {menuImages.length > 0 && <RestaurantMenus images={menuImages} />}
        <ReviewRatings restaurantData={data} handleModalVisibility={handleModalVisibility} />
        {data.reviews && <ReviewsList reviews={data.reviews} handleModalVisibility={handleModalVisibility} />}
        {data.reviews && (<AddReviewModal reviews={data.reviews} isModalOpen={isModalOpen} handleModalVisibility={handleModalVisibility} />)}
      </div>
    </div>
  );
};

export default Restaurant;
