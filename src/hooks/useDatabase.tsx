import { NewRestaurant } from '@shared/types/restaurant.ts';
import { NewComment } from '@shared/types/comment.ts';
import { Reaction } from '@shared/types/reaction.ts';
import { NewReview } from '@shared/types/review.ts';
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
    mutationFn: (data: NewRestaurant) => {
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
    mutationFn: (data: NewReview) => {
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
    mutationFn: ({ data, id }: { data: NewReview; id: string }) => {
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

  const addComment = useMutation({
    mutationFn: (data: NewComment) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
    },
  });

  const deleteImage = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/upload/files/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
  });

  const toggleReaction = useMutation({
    mutationFn: (data: Reaction) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/toggle-reaction`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
  });

  return { uploadImages, deleteImage, addRestaurant, addReview, updateReview, addComment, toggleReaction };
};

export default useDatabase;
