import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog.tsx';
import { createImageObject, createReviewObject } from '@pages/restaurant/utils/createObjects.ts';
import { ImageInterface, PayloadImageInterface, ReviewData } from '@shared/interfaces/forms.ts';
import DescriptionField from '@pages/restaurant/components/DescriptionField.tsx';
import SelectRating from '@pages/restaurant/components/SelectRating.tsx';
import ImageField from '@pages/restaurant/components/ImageField.tsx';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { useAuth } from '@auth/useAuth.ts';
import { Form } from '@shared/ui/form.tsx';
import Loader from '@shared/ui/loader.tsx';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { z } from 'zod';

const AddReviewModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { uploadImages, addReview } = useDatabase();

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

  const addReviewAndInvalidate = (addReviewObject: ReviewData) => {
    addReview.mutate(addReviewObject, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['restaurant'] }),
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errors = error?.response?.data?.error?.details?.errors;
          if (errors) console.log(errors);
        } else {
          console.log('An error occurred:' + error.message);
        }
      },
    });
    setLoading(false);
  };

  const uploadImagesAndGetReview = async (formData: FormData, reviewData: z.infer<typeof addReviewSchema>) => {
    await uploadImages.mutateAsync(formData, {
      onSuccess: ({ data }) => {
        const imagesArray: PayloadImageInterface = data.map((image: ImageInterface, index: number) =>
          createImageObject(image, index),
        );
        const addReviewObject = createReviewObject(reviewData, imagesArray, id);
        addReviewAndInvalidate(addReviewObject);
      },
    });
  };

  const onSubmit = async (reviewData: z.infer<typeof addReviewSchema>) => {
    setLoading(true);
    const formData = new FormData();
    Array.from(reviewData.image).forEach((file) => {
      formData.append('files', file);
    });

    await uploadImagesAndGetReview(formData, reviewData);
  };

  return (
    <Dialog>
      <DialogTrigger
        className="text-primary underline"
        onClick={(e) => {
          if (!userData) {
            e.preventDefault();
            toast('Account Required', {
              description: 'Please log in to add a review.',
              action: {
                label: 'Login',
                onClick: () => navigate('/login'),
              },
            });
          }
        }}
      >
        Rate now
      </DialogTrigger>
      <DialogContent className="shadow-no w-full max-w-3xl border-none bg-transparent bg-white">
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : 'Add review'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
