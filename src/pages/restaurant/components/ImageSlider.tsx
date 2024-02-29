import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel';
import { RestaurantImages } from '@pages/restaurant/interfaces/restaurant.ts';

interface ImageSliderProps {
  images: RestaurantImages[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  console.log(images);
  return (
    <Carousel className="h-[350px] w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image.path}`}
              className="h-[350px] w-full rounded-xl object-cover text-4xl font-semibold"
              alt={image.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageSlider;
