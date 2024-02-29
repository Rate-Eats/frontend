import { RestaurantImages } from '@pages/restaurant/interfaces/restaurant.ts';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import ExpandIcon from '@assets/svgs/icons/expand.svg?react';
import React from 'react';

interface RestaurantMenusProps {
  images: RestaurantImages[];
}

const RestaurantMenus = ({ images }: RestaurantMenusProps) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Restaurant menus</span>
      <div className="my-5 h-px w-full divide-x  bg-gray-200" />
      <div className="flex gap-4">
        {images.map((image) => (
          <Dialog>
            <DialogTrigger className="group relative mt-auto flex size-[140px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-400 transition">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image.path}`}
                alt={image.name}
                className="size-full object-cover"
              />
              <div className="absolute z-10 size-full bg-black opacity-0 transition group-hover:opacity-50" />
              <div className="absolute z-10 flex size-full items-center justify-center opacity-0 transition group-hover:opacity-100">
                <ExpandIcon />
              </div>
            </DialogTrigger>
            <DialogContent className="shadow-no border-none bg-transparent p-0">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image.path}`}
                alt={image.name}
                className="max-h-[calc(100vh_-_100px)] max-w-[calc(100vw_-_100px)] object-cover"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenus;
