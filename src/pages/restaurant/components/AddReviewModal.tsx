import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog.tsx';
import { ImageInterface, PayloadImageInterface } from '@shared/interfaces/forms.ts';
import DescriptionField from '@pages/restaurant/components/DescriptionField.tsx';
import SelectRating from '@pages/restaurant/components/SelectRating.tsx';
import ImageField from '@pages/restaurant/components/ImageField.tsx';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@auth/useAuth.ts';
import { Form } from '@shared/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import React from 'react';
import { z } from 'zod';

const AddReviewModal = () => {
  const { id } = useParams();
  const { uploadImages, addReview } = useDatabase();
  const navigate = useNavigate();
  const { userData } = useAuth();

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

  const onSubmit = async (reviewData: z.infer<typeof addReviewSchema>) => {
    const formData = new FormData();
    Array.from(reviewData.image).forEach((file) => {
      formData.append('files', file);
    });

    await uploadImages.mutateAsync(formData, {
      onSuccess: ({ data }) => {
        const imagesArray: PayloadImageInterface = data.map((image: ImageInterface, index: number) => ({
          main: false,
          path: image.hash + image.ext,
          hash: image.hash,
          name: image.name,
          extension: image.ext,
          __temp_key__: index,
        }));
        const addReviewObject = {
          rating_food: reviewData.food,
          rating_service: reviewData.service,
          rating_ambience: reviewData.ambience,
          rating_price: reviewData.price,
          description: reviewData.description,
          images: imagesArray,
          restaurant: {
            disconnect: [],
            connect: [
              {
                id: Number(id),
                position: {
                  end: true,
                },
              },
            ],
          },
        };
        addReview.mutate(addReviewObject, {
          onSuccess: (data) => console.log(data),
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              const errors = error?.response?.data?.error?.details?.errors;
              if (errors) console.log(errors);
            } else {
              console.log('An error occurred:' + error.message);
            }
          },
        });
      },
    });
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
            <Button type="submit">Add review</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
