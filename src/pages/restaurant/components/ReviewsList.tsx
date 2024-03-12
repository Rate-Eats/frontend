import { ReviewAttributes, Reviews } from '@pages/restaurant/interfaces/restaurant.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import Arrow from '@assets/svgs/icons/arrowDown.svg?react';
import Comment from '@assets/svgs/icons/comment.svg?react';
import Dislike from '@assets/svgs/icons/dislike.svg?react';
import Like from '@assets/svgs/icons/like.svg?react';
import Stars from '@components/rating/Stars.tsx';
import { useNavigate } from 'react-router-dom';

interface ReviewsListProps {
  reviews: Reviews;
}

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const navigate = useNavigate();

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

  const redirectToReview = (id: string) => {
    navigate(`/review/${id}`);
  };

  const redirectToUserProfile = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {reviews.data.map((review) => {
        const rating = calculateRating(review.attributes);
        const userData = review.attributes.users.data;
        const userDataAttributes = userData.attributes;
        const reviewImages = review.attributes.images.slice(0, 3);

        return (
          <div className="flex flex-col gap-4 rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="cursor-pointer" onClick={() => redirectToUserProfile(userData.id)}>
                  <AvatarImage src={`${baseUploadsUrl}${userDataAttributes.avatar}`} />
                  <AvatarFallback>{userDataAttributes.username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span
                    className="text-md cursor-pointer font-medium"
                    onClick={() => redirectToUserProfile(userData.id)}
                  >
                    {userDataAttributes.username}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(userDataAttributes.createdAt)}</span>
                </div>
              </div>
              <Stars rating={rating} />
            </div>
            <div className="line-clamp-2">{review.attributes.description}</div>
            <div className="flex gap-3">
              {reviewImages.map((image) => (
                <img src={`${baseUploadsUrl}${image.path}`} alt={image.name} className="size-[70px] rounded-md" />
              ))}
            </div>
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-3">
                <button className="group flex items-center gap-1">
                  <Like className="mb-1 text-gray-500 group-hover:text-primary" />
                  <span className="group-hover:text-primary">0</span>
                </button>
                <button className="group flex items-center gap-1">
                  <Dislike className="mt-1 text-gray-500 group-hover:text-primary" />
                  <span className="group-hover:text-primary">0</span>
                </button>
                <div className="flex items-center gap-1 pl-2">
                  <Comment className="text-gray-500" />0
                </div>
              </div>
              <button
                className="flex cursor-pointer items-center text-primary hover:underline"
                onClick={() => redirectToReview(review.id)}
              >
                Learn more
                <Arrow className="mt-px -rotate-90 scale-75 text-primary" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsList;
