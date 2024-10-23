import SkeletonLastAddedRestaurants from '@components/lastAddedRestaurants/SkeletonLastAddedRestaurants.tsx';
import { fetchLastAddedRestaurants } from '@components/lastAddedRestaurants/getRestaurants.ts';
import { useQuery } from '@tanstack/react-query';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}`;

const LastAddedRestaurants = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ['LastAddedRestaurants'],
    queryFn: () => fetchLastAddedRestaurants(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <SkeletonLastAddedRestaurants />;
  if (error || !data) return null;

  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-14">
      <div className="mx-8 flex w-full max-w-7xl gap-8">
        <div className="flex flex-1 flex-col gap-4">
          <span className="text-4xl">Last added restaurants</span>
          <span className="text-lg text-gray-600">
            This latest spot is now available for you to explore and rate. Discover what makes it special and share your
            thoughts with the community. Your review can help others decide if this restaurant is worth a visit!
          </span>
          <div className="mt-auto grid grid-cols-2 gap-4">
            {data.images.map((item, index) => (
              <img
                src={`${baseUploadsUrl}/${item.image.url}`}
                className="h-[150px] w-[250px]"
                alt="thumbnail"
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col border">
          <img
            src={`${baseUploadsUrl}/${data.images[0].image.url}`}
            alt="main image"
            className="w-full h-full max-h-[330px] object-cover"
          />
          <div className="flex flex-col gap-4 p-6">
            <span className="text-2xl">{data.name}</span>
            <span className="max-xl:text-md line-clamp-3 text-lg text-gray-600">{data.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastAddedRestaurants;
