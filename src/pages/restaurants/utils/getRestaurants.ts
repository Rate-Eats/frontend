import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface ParamsInterface {
  search_query: string | null;
  categories: string[];
  minimum_rating: string | null;
  maximum_rating: string | null;
}
export const getRestaurants = async (params: ParamsInterface): Promise<RestaurantData[]> => {
  const { search_query, categories, minimum_rating, maximum_rating } = params;

  const { data } = await axios.get(`${API_URL}/restaurants?populate=categories`, {
    params: {
      'filters[categories][value][$in]': categories,
      'filters[name][$contains]': search_query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
