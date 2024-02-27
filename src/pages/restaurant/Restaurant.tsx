import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import ImageSlider from '@pages/restaurant/components/ImageSlider.tsx';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (getRestaurant.isPending || !restaurantData) return;
  return (
    <div className="mx-auto mt-8 flex max-w-screen-lg justify-center gap-40">
      <ImageSlider images={restaurantData.attributes.images} />
    </div>
  );
};

export default Restaurant;