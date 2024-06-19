import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import UploadIcon from '@assets/svgs/icons/upload.svg?react';
import TrashIcon from '@assets/svgs/icons/trash.svg?react';
import { useImageField } from '@/hooks/useImageField.tsx';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@shared/ui/input.tsx';
import React from 'react';

export interface FormProps {
  form: UseFormReturn<{
    image: File[];
  }>;
}

const ImageField = ({ form }: FormProps) => {
  const { imagesToDisplay, handleFileChange, removeImage } = useImageField(form);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem className="space-y-1">
            <span className={`text-base font-medium ${form.formState.errors.image && 'text-destructive'}`}>Images</span>
            <FormLabel className="flex h-[130px] w-full cursor-pointer flex-col items-center justify-center gap-2 space-y-1 rounded-lg border border-gray-300 bg-white text-base font-medium text-gray-400">
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
            key={item.name}
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
