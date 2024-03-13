import { calculatePercentage } from '@pages/restaurant/utils/rating.ts';
import { ReviewData } from '@pages/review/interfaces/review.ts';
import { Progress } from '@shared/ui/progress.tsx';
import Stars from '@components/rating/Stars.tsx';

interface RatingsProps {
  reviewData: ReviewData;
}
const Ratings = ({ reviewData }: RatingsProps) => {
  const { rating_ambience, rating_food, rating_service, rating_price } = reviewData.attributes;
  const ratingSum = (rating_ambience + rating_food + rating_service + rating_price) / 4;

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Reviews and Ratings</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <div className="flex gap-8 md:gap-12 lg:gap-20">
        <div className="flex flex-col items-center justify-center gap-5 px-2 md:px-6 lg:px-10">
          <span className="whitespace-nowrap text-gray-500">Overall Rating</span>
          <span className="text-6xl text-primary">{ratingSum.toFixed(1)}</span>
          <Stars rating={ratingSum} />
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Food</span>
            <Stars rating={rating_food} />
            <Progress value={calculatePercentage(rating_food, 5)} className="h-[10px] w-full" />
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm"> Service</span>
            <Stars rating={rating_service} />
            <Progress value={calculatePercentage(rating_service, 5)} className="h-[10px] w-full" />
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Price</span>
            <Stars rating={rating_price} />
            <Progress value={calculatePercentage(rating_price, 5)} className="h-[10px] w-full" />
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Ambience</span>
            <Stars rating={rating_ambience} />
            <Progress value={calculatePercentage(rating_ambience, 5)} className="h-[10px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
