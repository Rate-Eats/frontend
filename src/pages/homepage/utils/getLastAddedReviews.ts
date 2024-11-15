import { Review } from '@shared/types/review.ts';
import axios from 'axios';

export const fetchLastAddedReviews = async (): Promise<Review[]> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/reviews?populate=images&populate=users&pagination[page]=1&pagination[pageSize]=3&sort=publishedAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
