import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel.tsx';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@shared/ui/dialog.tsx';
import { ImageDataInterface } from '@shared/interfaces/images.ts';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface ImageSliderProps {
  images: ImageDataInterface[];
  size?: 'thumbnail' | 'small' | 'medium' | 'large';
}

const ImageSlider = ({ images, size }: ImageSliderProps) => {
  const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const compareImages = (imageA: ImageDataInterface) => {
    return imageA.alternativeText?.split(' ').includes('main') ? 1 : 1;
  };

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {images.sort(compareImages).map((item, index) => (
          <CarouselItem key={index}>
            <Dialog>
              <DialogTrigger className="group relative mt-auto flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-none border-gray-300 bg-white text-gray-400 transition">
                <img
                  src={`${baseUploadsUrl}${size ? item?.formats[size]?.url || item.url : item.url}`}
                  className=" h-[350px] w-full cursor-pointer rounded-xl object-cover text-4xl font-semibold "
                  alt={index.toString()}
                  loading="lazy"
                />
              </DialogTrigger>
              <DialogContent className="shadow-no border-none bg-transparent p-0" aria-description={''}>
                <VisuallyHidden.Root>
                  <DialogTitle>{item.name}</DialogTitle>
                </VisuallyHidden.Root>
                <img
                  src={`${baseUploadsUrl}${item.url}`}
                  alt={item.name}
                  className="max-h-[calc(100vh_-_100px)] max-w-[calc(100vw_-_100px)] object-cover"
                  loading="lazy"
                />
                <VisuallyHidden.Root>
                  <DialogDescription>{item.alternativeText}</DialogDescription>
                </VisuallyHidden.Root>
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
