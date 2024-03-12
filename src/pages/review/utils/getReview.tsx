import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import axios from 'axios';

export const getReview = async (id: string = 'x'): Promise<RestaurantData> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
