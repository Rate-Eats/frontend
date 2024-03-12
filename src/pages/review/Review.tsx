import ErrorFetching from '@components/states/errorFetching/ErrorFetching.tsx';
import { getReview } from '@pages/review/utils/getReview.tsx';
import ReviewSkeleton from '@pages/review/ReviewSkeleton.tsx';
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
  if (error || !data) return <ErrorFetching errorText={'There was an error loading this review'} />;

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Review;
