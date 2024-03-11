import { ReviewAttributes, Reviews } from '@pages/restaurant/interfaces/restaurant.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import Stars from '@components/rating/Stars.tsx';

interface ReviewsListProps {
  reviews: Reviews;
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

  const calculateRating = (review: ReviewAttributes) => {
    const ratings = [review.rating_price, review.rating_ambience, review.rating_food, review.rating_service].filter(
      (rating) => rating !== 0,
    );

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat().format(new Date(date));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.data.map((review) => {
        const rating = calculateRating(review.attributes);
        const userData = review.attributes.users.data.attributes;
        const reviewImages = review.attributes.images.slice(0, 3);

        return (
          <div className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`${baseUploadsUrl}${userData.avatar}`} />
                  <AvatarFallback>{userData.username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-md font-medium">{userData.username}</span>
                  <span className="text-sm text-gray-500">{formatDate(userData.createdAt)}</span>
                </div>
              </div>
              <Stars rating={rating} />
            </div>
            <div>{review.attributes.description}</div>
            <div className="flex gap-3">
              {reviewImages.map((image) => (
                <img src={`${baseUploadsUrl}${image.path}`} alt={image.name} className="size-[70px] rounded-md" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsList;
