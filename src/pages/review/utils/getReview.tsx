import { ReviewData } from '@pages/review/interfaces/review.ts';
import axios from 'axios';

export const getReview = async (id: string = 'x'): Promise<ReviewData> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
    },
  });
  return data.data || null;
};
