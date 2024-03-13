import ReviewDescription from '@pages/review/components/ReviewDescription.tsx';
import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import ReviewImages from '@pages/review/components/ReviewImages.tsx';
import { getReview } from '@pages/review/utils/getReview.tsx';
import ReviewSkeleton from '@pages/review/ReviewSkeleton.tsx';
import Ratings from '@pages/review/components/Ratings.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Review = () => {
  const { id } = useParams();

  const { data, error, isFetching } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getReview(id),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <ReviewSkeleton />;
  if (error || !data) return <ErrorFetching errorText="There was an error loading this review" />;

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-center gap-5 py-6">
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8 text-2xl font-medium text-primary">
        {data.attributes.restaurant.data.attributes.name}
      </div>
      <ReviewDescription reviewDescription={data.attributes.description} />
      <ReviewImages reviewImages={data.attributes.images} />
      <Ratings reviewData={data} />
    </div>
  );
};

export default Review;
