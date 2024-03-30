import { ReviewData } from '@pages/review/interfaces/review.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getReview = async (id: string = 'x'): Promise<ReviewData> => {
  const { data } = await axios.get(
    `${API_URL}/reviews/${id}?populate[users][populate]=false&populate[images][populate]=false&populate[restaurant][populate]=false&populate[comments][populate]=users`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
