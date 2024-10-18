import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';
import { calculateRating } from '@pages/restaurant/utils/rating.ts';
import { Progress } from '@shared/ui/progress.tsx';
import Stars from '@components/rating/Stars.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/useAuth.ts';
import { toast } from 'sonner';

interface ReviewRatingsProps {
  restaurantData: RestaurantData;
  handleModalVisibility: () => void;
}
const ReviewRatings = ({ restaurantData, handleModalVisibility }: ReviewRatingsProps) => {
  const userData = useAuth();
  const navigate = useNavigate();

  const { reviews } = restaurantData;

  const rating = calculateRating(reviews);

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Reviews and Ratings</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <div className="flex gap-24">
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="whitespace-nowrap text-gray-500">Overall Rating & Reviews</span>
          <span className="text-6xl text-primary">{rating.rating.rating.toFixed(1)}</span>
          <Stars rating={rating.rating.rating} />
          <div className="flex gap-1 whitespace-nowrap text-gray-500">
            Based on {rating.rating.count} reviews
            <span className="cursor-pointer whitespace-nowrap text-primary underline">
              <button
                className="text-primary underline"
                onClick={() => {
                  if (!userData) {
                    toast('Account Required', {
                      description: 'Please log in to add a review.',
                      action: {
                        label: 'Login',
                        onClick: () => navigate('/login'),
                      },
                    });
                  } else if (userData) {
                    handleModalVisibility();
                  }
                }}
              >
                Rate now
              </button>
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Food</span>
            <Stars rating={rating.rating_food.rating} />
            <Progress value={rating.rating_food.percentage} className="h-[10px] w-full" />
            <span className="text-primary">{rating.rating_food.count}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm"> Service</span>
            <Stars rating={rating.rating_service.rating} />
            <Progress value={rating.rating_service.percentage} className="h-[10px] w-full" />
            <span className="text-primary">{rating.rating_service.count}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Price</span>
            <Stars rating={rating.rating_price.rating} />
            <Progress value={rating.rating_price.percentage} className="h-[10px] w-full" />
            <span className="text-primary">{rating.rating_price.count}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-20 text-sm">Ambience</span>
            <Stars rating={rating.rating_ambience.rating} />
            <Progress value={rating.rating_ambience.percentage} className="h-[10px] w-full" />
            <span className="text-primary">{rating.rating_ambience.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRatings;
