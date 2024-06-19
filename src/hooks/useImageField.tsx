import { UseFormClearErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import React from 'react';

type ImageField = {
  image: File[];
};

type Props<T extends ImageField> = {
  setValue: T extends ImageField ? UseFormSetValue<T> : never;
  clearErrors: T extends ImageField ? UseFormClearErrors<T> : never;
  getValues: T extends ImageField ? UseFormGetValues<T> : never;
  watch: T extends ImageField ? UseFormWatch<T> : never;
};

export const useImageField = <T extends ImageField>({ setValue, clearErrors, getValues, watch }: Props<T>) => {
  const imagesToDisplay = watch('image');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { image } = getValues();
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => file);
      setValue('image', [...image, ...fileArray]);
      clearErrors('image');
    }
  };

  const removeImage = (name: string) => {
    const filteredImages = getValues('image').filter((item: { name: string }) => item.name !== name);
    setValue('image', filteredImages);
  };

  return { imagesToDisplay, handleFileChange, removeImage };
};
