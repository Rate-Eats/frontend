import { Restaurant } from '@shared/types/restaurant.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

type ParamsInterface = {
  search_query: string | null;
  minimum_rating: string | null;
  maximum_rating: string | null;
  order: string | null;
  categories: string[];
};

export const getRestaurants = async (params: ParamsInterface): Promise<Restaurant[]> => {
  const { search_query, categories, minimum_rating, maximum_rating, order } = params;
  const { data } = await axios.get(`${API_URL}/restaurants?populate=images&populate=categories`, {
    params: {
      'filters[categories][value][$in]': categories,
      'filters[name][$contains]': search_query,
      'filters[median_rating][$gte]': minimum_rating,
      'filters[median_rating][$lte]': maximum_rating,
      sort: order ? `${order === 'name' ? order + ':asc' : order + ':desc'}` : null,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
