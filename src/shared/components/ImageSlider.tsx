import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel.tsx';
import { RestaurantImages } from '@pages/restaurant/interfaces/restaurant.ts';
import { Dialog, DialogContent, DialogTrigger } from '@shared/ui/dialog.tsx';

interface ImageSliderProps {
  images: RestaurantImages[];
  size: 'small' | 'medium' | 'large';
}

const ImageSlider = ({ images, size }: ImageSliderProps) => {
  const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

  const compareImages = (imageA: RestaurantImages) => {
    return imageA.main ? 1 : -1;
  };

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {images.sort(compareImages).map((image, index) => (
          <CarouselItem key={index}>
            <Dialog>
              <DialogTrigger className="group relative mt-auto flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-none border-gray-300 bg-white text-gray-400 transition">
                <img
                  src={`${baseUploadsUrl}${size}_${image.hash}.avif`}
                  className=" h-[350px] w-full cursor-pointer rounded-xl object-cover text-4xl font-semibold "
                  alt={index.toString()}
                  loading="lazy"
                />
              </DialogTrigger>
              <DialogContent className="shadow-no border-none bg-transparent p-0">
                <img
                  src={`${baseUploadsUrl}${image.path}`}
                  alt={image.name}
                  className="max-h-[calc(100vh_-_100px)] max-w-[calc(100vw_-_100px)] object-cover"
                  loading="lazy"
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
