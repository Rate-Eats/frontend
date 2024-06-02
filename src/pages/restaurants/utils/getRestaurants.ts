import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (): Promise<RestaurantData> => {
  const { data } = await axios.get(
    `${API_URL}/restaurants`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
