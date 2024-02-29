import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel';
import { RestaurantImages } from '@pages/restaurant/interfaces/restaurant.ts';
import { Dialog, DialogContent, DialogTrigger } from '@shared/ui/dialog.tsx';
import React from 'react';

interface ImageSliderProps {
  images: RestaurantImages[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const compare = (a: RestaurantImages) => {
    if (a.main) return -1;
    else {
      return 1;
    }
  };

  return (
    <Carousel className="h-[350px] w-full">
      <CarouselContent>
        {images.sort(compare).map((image, index) => (
          <CarouselItem key={index}>
            <Dialog>
              <DialogTrigger className="group relative mt-auto flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-none border-gray-300 bg-white text-gray-400 transition">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image.path}`}
                  className="h-[350px] w-full cursor-pointer rounded-xl object-cover text-4xl font-semibold"
                  alt={image.name}
                />
              </DialogTrigger>
              <DialogContent className="shadow-no border-none bg-transparent p-0">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image.path}`}
                  alt={image.name}
                  className="max-h-[calc(100vh_-_100px)] max-w-[calc(100vw_-_100px)] object-cover"
                />
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageSlider;
