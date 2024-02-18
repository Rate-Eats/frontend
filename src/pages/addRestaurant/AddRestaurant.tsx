import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/shared/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { addRestaurantSchema } from '@/schemas/addRestaurantSchema.ts';
import UploadIcon from '@assets/svgs/icons/upload.svg?react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';
import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';

const categories = [
  { label: 'Burger', value: 'burger' },
  { label: 'Fast food', value: 'fastFood' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Sushi', value: 'sushi' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Italian', value: 'italian' },
  { label: 'Indian', value: 'indian' },
  { label: 'Chinese', value: 'chinese' },
] as const;

const AddRestaurant = () => {
  const form = useForm<z.infer<typeof addRestaurantSchema>>({
    resolver: zodResolver(addRestaurantSchema),
    defaultValues: {
      name: 'dsa',
      description: '',
      category: [],
      address: 'dsa',
      image: [],
    },
  });

  function onSubmit(data: z.infer<typeof addRestaurantSchema>) {
    console.log(data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { image } = form.getValues();
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => ({
        name: file.name,
        blobUrl: URL.createObjectURL(file),
      }));
      form.setValue('image', [...image, ...fileArray]);
      form.clearErrors('image');
    }
  };

  const handleCategoryChange = (category: { value: string }) => {
    const currentCategoryValues = categoriesToDisplay;
    if (currentCategoryValues.includes(category.value)) {
      form.setValue(
        'category',
        currentCategoryValues.filter((item) => item !== category.value),
      );
      form.clearErrors('category');
    } else {
      form.setValue('category', [...currentCategoryValues, category.value]);
      form.clearErrors('category');
    }
  };

  const handleShowCategories = () => {
    return categoriesToDisplay.length > 0 ? (
      categoriesToDisplay.map((categoryValue) => {
        const category = categories.find((cat) => cat.value === categoryValue);
        return (
          category && (
            <div
              className="rounded-sm bg-[#F0F0F0] p-1.5 text-[#6E7072]"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryChange(category);
              }}
            >
              {category.label}
            </div>
          )
        );
      })
    ) : (
      <span className="text-gray-400">Select category</span>
    );
  };

  const removeImage = (name: string) => {
    const filteredImages = form.getValues('image').filter((item) => item.name !== name);
    form.setValue('image', filteredImages);
  };

  const imagesToDisplay = form.watch('image');
  const categoriesToDisplay = form.watch('category');

  return (
    <div className="flex w-full justify-center px-5">
      <div className="mt-12 flex w-full max-w-screen-lg flex-col gap-2.5 ">
        <div className="mb-2 border-b border-b-[#C5C5C5] py-1.5 text-[22px] text-xl font-medium">Add restaurant</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className=" mb-3 text-base font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here..."
                      {...field}
                      className="h-12 border border-gray-300  bg-white focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className=" mb-3 text-base font-medium">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here..."
                      {...field}
                      className="h-12 border border-gray-300 bg-white focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem className="flex flex-col space-y-1">
                  <FormLabel className="text text-base font-medium">Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="flex h-12 w-full justify-between border-gray-300 hover:bg-white"
                        >
                          <div className="flex gap-2">{handleShowCategories()}</div>
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      style={{
                        width: 'var(--radix-popover-trigger-width)',
                      }}
                    >
                      <Command>
                        <CommandInput placeholder="Search category..." className="h-9" />
                        <CommandEmpty>No Category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => handleCategoryChange(category)}
                            >
                              {category.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className=" mb-3 text-base font-medium">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here..."
                      {...field}
                      className="h-12 border border-gray-300  bg-white focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="space-y-1">
                    <span
                      className={`text-base text-sm font-medium ${form.formState.errors.image && 'text-destructive'}`}
                    >
                      Images
                    </span>
                    <FormLabel className="flex  h-[130px] w-full cursor-pointer flex-col items-center justify-center gap-2 space-y-1 rounded-lg border border-gray-300 bg-white text-base font-medium text-gray-400">
                      <UploadIcon />
                      Upload images
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="file"
                        placeholder={'siema'}
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              {imagesToDisplay.map((item) => (
                <img
                  src={item.blobUrl}
                  onClick={() => removeImage(item.name)}
                  className="mt-auto flex h-[130px] w-full cursor-pointer flex-col items-center justify-center gap-2 space-y-1 rounded-lg border border-gray-300 bg-white text-gray-400"
                  alt={'restaurant image'}
                />
              ))}
            </div>
            <Button type="submit">add restaurant</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRestaurant;
