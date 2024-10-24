import { createImageObject, createReviewObject } from '@pages/restaurant/utils/createObjects.ts';
import { ImageInterface, PayloadImageInterface, ReviewData } from '@shared/interfaces/forms.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/dialog.tsx';
import { RestaurantImages, Reviews } from '@pages/restaurant/interfaces/restaurant.ts';
import DescriptionField from '@pages/restaurant/components/DescriptionField.tsx';
import SelectRating from '@pages/restaurant/components/SelectRating.tsx';
import ImageField from '@pages/restaurant/components/ImageField.tsx';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { useParams } from 'react-router-dom';
import { useAuth } from '@auth/useAuth.ts';
import { Form } from '@shared/ui/form.tsx';
import Loader from '@shared/ui/loader.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface AddReviewModalProps {
  reviews: Reviews[];
  isModalOpen: boolean;
  handleModalVisibility: (value?: boolean) => void;
}

const AddReviewModal = ({ reviews, isModalOpen, handleModalVisibility }: AddReviewModalProps) => {
  const { uploadImages, addReview, updateReview } = useDatabase();
  const [currentImages, setCurrentImages] = useState<RestaurantImages[]>([]);
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [existingReviewId, setExistingReview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getReviews().then(() => {
      return;
    });
  }, []);

  const getReviews = async () => {
    const existingReview = reviews.find((review) => review.users.documentId === userData?.documentId);
    if (existingReview) {
      form.setValue('food', existingReview.rating_food);
      form.setValue('service', existingReview.rating_service);
      form.setValue('price', existingReview.rating_price);
      form.setValue('ambience', existingReview.rating_ambience);
      form.setValue('description', existingReview.description);
      const existingImages = existingReview.images.map((image) => ({
        extension: image.extension,
        hash: image.hash,
        main: image.main,
        menu: image.menu,
        name: image.name,
        path: image.path,
      }));

      setCurrentImages(existingImages);
      setExistingReview(existingReview.documentId);
    }
  };

  const addReviewAndInvalidate = (addReviewObject: ReviewData) => {
    addReview.mutate(addReviewObject, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['restaurant'] }),
      onError: () => setErrorMessage('An error occurred while uploading your review'),
    });

    setLoading(false);
    handleModalVisibility(false);
  };

  const updateReviewAndInvalidate = (addReviewObject: ReviewData) => {
    const data = addReviewObject;
    updateReview.mutate(
      {
        data,
        id: existingReviewId,
      },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['restaurant'] }),
        onError: () => setErrorMessage('An error occurred while uploading your review'),
      },
    );

    setLoading(false);
    handleModalVisibility(false);
  };

  const uploadImagesAndGetReview = async (formData: FormData, reviewData: z.infer<typeof addReviewSchema>) => {
    await uploadImages.mutateAsync(formData, {
      onSuccess: ({ data }) => {
        const imagesArray: PayloadImageInterface[] = data.map((image: ImageInterface) => createImageObject(image));
        if (userData && id) {
          const addReviewObject = createReviewObject(
            reviewData,
            [...imagesArray, ...currentImages],
            id,
            userData.documentId,
          );
          existingReviewId ? updateReviewAndInvalidate(addReviewObject) : addReviewAndInvalidate(addReviewObject);
        }
      },
      onError: () => {
        setErrorMessage('An error occurred while uploading images');
        setLoading(false);
      },
    });
  };

  const onSubmit = async (reviewData: z.infer<typeof addReviewSchema>) => {
    if (reviewData.image.length < 1 && userData && id) {
      const addReviewObject = createReviewObject(reviewData, currentImages, id, userData.documentId);
      existingReviewId ? updateReviewAndInvalidate(addReviewObject) : addReviewAndInvalidate(addReviewObject);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    Array.from(reviewData.image).forEach((file) => {
      formData.append('files', file);
    });

    await uploadImagesAndGetReview(formData, reviewData);
    handleModalVisibility(false);
  };

  const removeAdditionalItems = (id: string) => {
    const images = currentImages.filter((image) => image.hash !== id);
    setCurrentImages(images);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleModalVisibility(false)}>
      <DialogContent className="shadow-no w-full max-w-lg border-none bg-transparent bg-white">
        <DialogHeader>
          <DialogTitle className="w-[400px] text-[22px]">Rating & Feedback form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-8">
            <div className="flex min-w-[90px] flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="w-40 text-lg">Food</span>
                <SelectRating form={form} ratingType="food" />
              </div>
              <div className="flex items-center justify-between">
                <span className="w-40 text-lg">Service</span>
                <SelectRating form={form} ratingType="service" />
              </div>
              <div className="flex items-center justify-between">
                <span className="w-40 text-lg">Price</span>
                <SelectRating form={form} ratingType="price" />
              </div>
              <div className="flex items-center justify-between">
                <span className="w-40 text-lg">Ambience</span>
                <SelectRating form={form} ratingType="ambience" />
              </div>
            </div>
            <DescriptionField form={form} />
            <ImageField form={form} additionalImages={currentImages} removeAdditionalItems={removeAdditionalItems} />
            {errorMessage && <span className="mx-auto font-medium text-red-500">{errorMessage}</span>}
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : existingReviewId ? 'Update review' : 'Add review'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
