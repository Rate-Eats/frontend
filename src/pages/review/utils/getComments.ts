import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getComments = async () => {
  const { data } = await axios.get(
    `${API_URL}/comments?populate=users&sort=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    },
  );
  return data.data || null;
};
