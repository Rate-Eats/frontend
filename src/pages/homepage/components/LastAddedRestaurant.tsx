import LastAddedRestaurantSkeleton from '@pages/homepage/components/LastAddedRestaurantSkeleton.tsx';
import { fetchLastAddedRestaurants } from '@pages/homepage/utils/getLastAddedRestaurant.ts';
import ArrowRight from '@assets/svgs/icons/arrowRight.svg?react';
import Review from '@assets/svgs/icons/review.svg?react';
import Eye from '@assets/svgs/icons/eye.svg?react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@shared/ui/badge.tsx';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}`;

const LastAddedRestaurant = () => {
  const navigate = useNavigate();

  const { error, data, isFetching } = useQuery({
    queryKey: ['LastAddedRestaurant'],
    queryFn: () => fetchLastAddedRestaurants(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <LastAddedRestaurantSkeleton />;
  if (error || !data || !data.images) return null;

  const redirectToRestaurant = (id: string) => navigate(`/restaurant/${id}`);

  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-14">
      <div className="mx-8 flex w-full max-w-7xl gap-8">
        <div className="flex flex-1 flex-col gap-4">
          <span className="text-4xl">Last added restaurant</span>
          <span className="text-lg text-gray-600">
            This latest spot is now available for you to explore and rate. Discover what makes it special and share your
            thoughts with the community. Your review can help others decide if this restaurant is worth a visit!
          </span>
          <div className="mt-auto grid grid-cols-2 gap-4">
            {data.images.slice(0, 4).map((item, index) => (
              <img
                src={`${baseUploadsUrl}${item?.formats?.small?.url || item.url}`}
                className="h-[150px] w-full object-cover"
                alt="thumbnail"
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
            <img
              className="max-h-64 w-full cursor-pointer object-cover object-center"
              src={`${baseUploadsUrl}${data?.images[0]?.formats?.large?.url || data.images[0].url}`}
              alt="main image"
              onClick={() => redirectToRestaurant(data.documentId)}
            />
            <div className="flex flex-1 flex-col p-6 pt-4">
              <span className="title-font mb-2 flex gap-2 text-xs font-medium tracking-widest text-gray-400">
                {data.categories?.map((category) => <Badge variant="secondary">{category.name}</Badge>)}
              </span>
              <span
                className="title-font mb-3 cursor-pointer text-lg font-medium text-gray-900"
                onClick={() => redirectToRestaurant(data.documentId)}
              >
                {data.name}
              </span>
              <p className="mb-3 line-clamp-3 leading-relaxed text-gray-600">{data.description}</p>
              <div className="mt-auto flex flex-wrap items-center">
                <button
                  className="inline-flex cursor-pointer items-center text-indigo-500"
                  onClick={() => redirectToRestaurant(data.documentId)}
                >
                  Learn More
                  <ArrowRight />
                </button>
                <span className="ml-auto mr-3 inline-flex items-center border-r-2 border-gray-200 py-1 pr-3 text-sm leading-none text-gray-400">
                  <Eye />
                  1.2K
                </span>
                <span className="mr-3 inline-flex items-center py-1 text-sm leading-none text-gray-400">
                  <Review className="mr-1 mt-[-2px]" />6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastAddedRestaurant;
