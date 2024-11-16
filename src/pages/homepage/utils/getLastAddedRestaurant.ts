import { Restaurant } from '@shared/types/restaurant.ts';
import axios from 'axios';

export const fetchLastAddedRestaurants = async (): Promise<Restaurant> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/restaurants?populate=images&pagination[page]=1&pagination[pageSize]=1&sort=publishedAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data[0] || null;
};
