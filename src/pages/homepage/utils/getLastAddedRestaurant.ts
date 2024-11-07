import axios from 'axios';
import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';

export const fetchLastAddedRestaurants = async (): Promise<RestaurantData> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/restaurants?populate=images&pagination[page]=1&pagination[pageSize]=1&sort=publishedAt:desc`,
    {
      headers: {
        Authorization: ` 'Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}'`,
      },
    },
  );
  return data.data[0] || null;
};
