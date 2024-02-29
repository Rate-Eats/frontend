import RestaurantDetails from '@pages/restaurant/components/RestaurantDetails.tsx';
import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import RestaurantSkeleton from '@pages/restaurant/RestaurantSkeleton.tsx';
import ImageSlider from '@pages/restaurant/components/ImageSlider.tsx';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantMenus from '@pages/restaurant/components/RestaurantMenus.tsx';

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
  const { id } = useParams();

  const getRestaurant = useMutation({
    mutationFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/restaurants/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
        },
      }),
    onSuccess: (data) => setRestaurantData(data.data.data),
    onError: () => console.log('errror'),
  });

  useEffect(() => {
    getRestaurant.mutate();
  }, []);

  if (getRestaurant.isPending || !restaurantData) return <RestaurantSkeleton />;
  return (
    <div className="mx-auto mt-5 flex w-full max-w-screen-xl flex-col justify-center gap-5">
      <ImageSlider images={restaurantData.attributes.images.filter((image) => image.menu)} />
      <RestaurantDetails restaurantData={restaurantData} />
      <RestaurantMenus images={restaurantData.attributes.images.filter((image) => image.menu)} />
    </div>
  );
};

export default Restaurant;
