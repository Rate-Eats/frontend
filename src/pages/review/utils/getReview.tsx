import { ReviewData } from '@pages/review/interfaces/review.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getReview = async (id: string = 'x'): Promise<ReviewData> => {
  const { data } = await axios.get(
    `${API_URL}/reviews/${id}?populate[0]=users&populate[1]=images&populate[2]=restaurant&populate[3]=comments.users`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
