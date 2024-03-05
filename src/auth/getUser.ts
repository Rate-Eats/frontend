import axios from 'axios';

export const getUser = async (jwtToken: string) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/me?`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return data;
};
