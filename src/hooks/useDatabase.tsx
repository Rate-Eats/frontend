import { RestaurantData, ReviewData } from '@shared/interfaces/forms.ts';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@auth/useAuth.ts';
import axios from 'axios';

interface UpdateReviewProps {
  data: ReviewData;
  id: string;
}

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

  const updateReview = useMutation({
    mutationFn: ({ data, id }: UpdateReviewProps) => {
      return axios.put(
        `${import.meta.env.VITE_API_URL}/reviews/${id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
    },
  });

  return { uploadImages, addRestaurant, addReview, updateReview };
};

export default useDatabase;
