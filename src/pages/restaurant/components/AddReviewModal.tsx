import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog.tsx';
import DescriptionField from '@pages/restaurant/components/DescriptionField.tsx';
import SelectRating from '@pages/restaurant/components/SelectRating.tsx';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button.tsx';
import { Form } from '@shared/ui/form.tsx';
import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';
import ImageField from '@pages/restaurant/components/ImageField.tsx';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@auth/useAuth.ts';

const AddReviewModal = () => {
  const { jwtToken } = useAuth();

  const form = useForm<z.infer<typeof addReviewSchema>>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      description: '',
      food: 0,
      service: 0,
      price: 0,
      ambience: 0,
      image: [],
    },
  });

  const uploadImages = useMutation({
    mutationFn: (files: FormData) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/upload`, files, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
      } else {
        console.log('An error occurred:' + error.message);
      }
    },
  });

  const onSubmit = async (restaurantData: z.infer<typeof addReviewSchema>) => {
    console.log(restaurantData);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-primary underline">Rate now</DialogTrigger>

      <DialogContent className="shadow-no w-full max-w-3xl border-none bg-transparent bg-white   ">
        <DialogHeader>
          <DialogTitle className="w-[400px] text-[22px]">Rating & Feedback form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <div className="flex h-40 min-w-[90px] flex-col gap-5">
              <div className="flex">
                <span className="w-40">Food</span>
                <SelectRating form={form} ratingType="food" />
              </div>
              <div className="flex">
                <span className="w-40">Service</span>
                <SelectRating form={form} ratingType="service" />
              </div>
              <div className="flex">
                <span className="w-40">Price</span>
                <SelectRating form={form} ratingType="price" />
              </div>
              <div className="flex">
                <span className="w-40">Ambience</span>
                <SelectRating form={form} ratingType="ambience" />
              </div>
            </div>
            <DescriptionField form={form} />
            <ImageField form={form} />
            <Button type="submit">Add review</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
