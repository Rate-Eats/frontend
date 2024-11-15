import { createUpdateReviewObjects } from '@pages/restaurant/utils/createUpdateReviewObjects.ts';
import { createAddReviewObjects } from '@pages/restaurant/utils/createAddReviewObjects.ts';
import { createUploadImagesFormData } from '@shared/utils/createUploadImagesFormData.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/dialog.tsx';
import DescriptionField from '@pages/restaurant/components/DescriptionField.tsx';
import SelectRating from '@pages/restaurant/components/SelectRating.tsx';
import ImageField from '@pages/restaurant/components/ImageField.tsx';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import useDatabase from '@/hooks/useDatabase.tsx';
import { NewReview, Review } from '@shared/types/review.ts';
import { Button } from '@shared/ui/button.tsx';
import { Image } from '@shared/types/image.ts';
import { useParams } from 'react-router-dom';
import { useAuth } from '@auth/useAuth.ts';
import { Form } from '@shared/ui/form.tsx';
import Loader from '@shared/ui/loader.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AddReviewModalProps = {
  reviews: Review[];
  isModalOpen: boolean;
  handleModalVisibility: (value?: boolean) => void;
};

const AddReviewModal = ({ reviews, isModalOpen, handleModalVisibility }: AddReviewModalProps) => {
  const { uploadImages, addReview, deleteImage, updateReview } = useDatabase();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [previousExistingImages, setPreviousExistingImages] = useState<Image[]>([]);
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
    (async () => await getReviews())();
  }, []);

  const getReviews = async () => {
    const existingReview = reviews.find((review) => review.users.documentId === userData?.documentId);
    if (existingReview) {
      form.setValue('food', existingReview.rating_food);
      form.setValue('service', existingReview.rating_service);
      form.setValue('price', existingReview.rating_price);
      form.setValue('ambience', existingReview.rating_ambience);
      form.setValue('description', existingReview.description);

      if (existingReview.images) {
        setPreviousExistingImages(existingReview.images.map((item) => ({ ...item, action: null })));
      }
      setExistingReview(existingReview.documentId);
    }
  };

  const handleAdditionalItems = (action: 'delete' | 'update', documentId: string) => {
    setPreviousExistingImages((prevImages) =>
      prevImages.map((image) => (image.documentId === documentId ? { ...image, action } : image)),
    );
  };

  const uploadImagesToReview = async (images: File[], id: number) => {
    const formData = createUploadImagesFormData(images, id, 'api::review.review');

    await uploadImages.mutateAsync(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['restaurant'] });
        setLoading(false);
        handleModalVisibility(false);
      },
      onError: () => setErrorMessage('An error.ts occurred while uploading your review'),
    });
  };

  const handlePreviewExistingFiles = () => {
    previousExistingImages.forEach((image) => {
      if (image.action === 'delete') deleteImage.mutate(image.id);
      if (image.action === 'update') console.log('');
    });
  };

  const handleSuccess = async (images: File[], reviewId: number) => {
    if (images.length > 0) {
      await uploadImagesToReview(images, reviewId);
    } else {
      setLoading(false);
      handleModalVisibility(false);
      await queryClient.invalidateQueries({ queryKey: ['restaurant'] });
    }
  };

  const updateReviewFunc = (data: NewReview, images: File[]) => {
    handlePreviewExistingFiles();
    updateReview.mutate(
      {
        data,
        id: existingReviewId,
      },
      {
        onSuccess: (data) => handleSuccess(images, data.data.data.id),
        onError: () => setErrorMessage('An error.ts occurred while uploading your review'),
      },
    );
  };

  const addReviewFunc = (addReviewObject: NewReview, images: File[]) => {
    addReview.mutate(addReviewObject, {
      onSuccess: (data) => handleSuccess(images, data.data.data.id),
      onError: () => setErrorMessage('An error.ts occurred while uploading your review'),
    });
  };

  const onSubmit = async (reviewData: z.infer<typeof addReviewSchema>) => {
    if (userData && id) {
      if (existingReviewId) {
        const updateReviewObject = createUpdateReviewObjects(reviewData, id, userData.documentId);
        updateReviewFunc(updateReviewObject, reviewData.image);
      } else {
        const addReviewObject = createAddReviewObjects(reviewData, id, userData.documentId);
        addReviewFunc(addReviewObject, reviewData.image);
      }
    } else {
      handleModalVisibility(false);
    }
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
            <ImageField
              form={form}
              previousExistingImages={previousExistingImages}
              handleAdditionalItems={handleAdditionalItems}
            />
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
