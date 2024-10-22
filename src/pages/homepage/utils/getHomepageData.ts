import axios from 'axios';
import { HomepageData } from '@pages/homepage/interfaces/homepage.ts';

const API_URL = import.meta.env.VITE_API_URL;
const VITE_GET_RESTAURANT_TOKEN = import.meta.env.VITE_GET_RESTAURANT_TOKEN;

export const getHomepageData = async (): Promise<HomepageData> => {
  const { data } = await axios.get(`${API_URL}/homepage?populate=*`, {
    headers: {
      Authorization: `Bearer ${VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
