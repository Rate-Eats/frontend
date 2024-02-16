import { useQuery } from '@tanstack/react-query';
import { fetchLastAddedRestaurants } from '@components/lastAddedRestaurants/getRestaurants.ts';
import SkeletonLastAddedRestaurants from '@components/lastAddedRestaurants/SkeletonLastAddedRestaurants.tsx';

const LastAddedRestaurants = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ['LastAddedRestaurants'],
    queryFn: () => fetchLastAddedRestaurants(),
  });

  if (isFetching) return <SkeletonLastAddedRestaurants />;
  if (error || !data) return null;

  const imagesData = data.attributes.images;
  const thumbnailImages = imagesData.filter(({ main }) => !main).map(({ path }) => path);
  const mainImage = imagesData.find(({ main }) => main)?.path;

  return (
    <div className="flex h-[500px] w-10/12 max-w-[1360px] gap-10 self-center justify-self-auto border p-10">
      <div className="flex flex-1 flex-col gap-4">
        <span>Last added restaurants</span>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</span>
        <div className="mt-auto grid grid-cols-2 gap-4">
          {thumbnailImages.map((imageUrl, index) => (
            <img
              src={`${import.meta.env.VITE_WEBSITE_URL}/uploads/${imageUrl}`}
              className="h-[150px] w-[250px]"
              alt="thumbnail"
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col">
        <img src={`http://localhost:1337/uploads/${mainImage}`} />
        <h1>{data.attributes.name}</h1>
      </div>
    </div>
  );
};

export default LastAddedRestaurants;
