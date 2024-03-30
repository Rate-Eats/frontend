import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRestaurant = async (id: string = 'x'): Promise<RestaurantData> => {
  const { data } = await axios.get(
    `${API_URL}/restaurants/${id}?populate[reviews][populate][1]=users&populate[reviews][populate][2]=images&populate=images`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
