import { Category } from '@shared/interfaces/category.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${API_URL}/categories?populate=icon`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
