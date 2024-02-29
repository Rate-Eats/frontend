import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import { FormProps } from '@pages/addRestaurant/interfaces/formProps.ts';
import UploadIcon from '@assets/svgs/icons/upload.svg?react';
import TrashIcon from '@assets/svgs/icons/trash.svg?react';
import { Input } from '@shared/ui/input.tsx';
import React from 'react';

const ImageField = ({ form }: FormProps) => {
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
    const filteredImages = form.getValues('image').filter((item) => item.name !== name);
    form.setValue('image', filteredImages);
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem className="space-y-1">
            <span className={`text-base font-medium ${form.formState.errors.image && 'text-destructive'}`}>Images</span>
            <FormLabel className="flex  h-[130px] w-full cursor-pointer flex-col items-center justify-center gap-2 space-y-1 rounded-lg border border-gray-300 bg-white text-base font-medium text-gray-400">
              <UploadIcon />
              Upload images
            </FormLabel>
            <FormControl>
              <Input className="hidden" type="file" multiple accept="image/*" onChange={handleFileChange} />
            </FormControl>
            <FormMessage className="" />
          </FormItem>
        )}
      />
      {imagesToDisplay.map((item) => {
        const imageUrl = URL.createObjectURL(item);
        return (
          <div
            className="group relative mt-auto flex h-[130px] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-400 transition"
            onClick={() => removeImage(item.name)}
          >
            <img
              key={item.name}
              src={imageUrl}
              className="h-full w-full object-cover transition group-hover:blur-[2px]"
              alt={'restaurant image'}
            />
            <div className="absolute z-10 h-full w-full bg-black opacity-0 transition group-hover:opacity-50" />
            <div className="absolute z-10 flex h-full w-full items-center justify-center opacity-0 transition group-hover:opacity-100">
              <TrashIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageField;
