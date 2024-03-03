import { RestaurantData, ReviewData } from '@shared/interfaces/forms.ts';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@auth/useAuth.ts';
import axios from 'axios';

const useDatabase = () => {
  const { jwtToken } = useAuth();

  const uploadImages = useMutation({
    mutationFn: (files: FormData) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/upload`, files, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
  });

  const addRestaurant = useMutation({
    mutationFn: (data: RestaurantData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/restaurants`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
    },
  });

  const addReview = useMutation({
    mutationFn: (data: ReviewData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
    },
  });

  return { uploadImages, addRestaurant, addReview };
};

export default useDatabase;
