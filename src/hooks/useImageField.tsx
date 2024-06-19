import { UseFormReturn } from 'react-hook-form';
import React from 'react';

type FormProps = UseFormReturn<{
  image: File[];
}>;

export const useImageField = (form: FormProps) => {
  const imagesToDisplay = form.watch('image');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { image } = form.getValues();
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => file);
      form.setValue('image', [...image, ...fileArray]);
      form.clearErrors('image');
    }
  };

  const removeImage = (name: string) => {
    const filteredImages = form.getValues('image').filter((item: { name: string }) => item.name !== name);
    form.setValue('image', filteredImages);
  };

  return { imagesToDisplay, handleFileChange, removeImage };
};
