import LastAddedRestaurantSkeleton from '@pages/homepage/components/LastAddedRestaurantSkeleton.tsx';
import { fetchLastAddedReviews } from '@pages/homepage/utils/getLastAddedReviews.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import Dislike from '@assets/svgs/icons/dislike.svg?react';
import Comment from '@assets/svgs/icons/comment.svg?react';
import { formatDate } from '@shared/utils/formatDate.ts';
import Like from '@assets/svgs/icons/like.svg?react';
import Stars from '@components/rating/Stars.tsx';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const LastAddedReviews = () => {
  const navigate = useNavigate();

  const { error, data, isFetching } = useQuery({
    queryKey: ['LastAddedReviews'],
    queryFn: () => fetchLastAddedReviews(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <LastAddedRestaurantSkeleton />;
  if (error || !data) return null;

  const redirectToReview = (id: string) => navigate(`/review/${id}`);
  const redirectToUser = (id: string) => navigate(`/user/${id}`);

  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-14">
      <div className="mx-8 flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-1 flex-col gap-4">
          <span className="text-4xl">Our users last reviews</span>
        </div>
        <div className="flex w-full flex-1 gap-6">
          {data.map((item) => {
            const ratings = [item.rating_ambience, item.rating_food, item.rating_service, item.rating_price];
            const validateRatings = ratings.filter((value) => value !== null).length;
            const ratingSum = ratings.reduce((prev, value) => prev + (value || 0), 0);
            return (
              <div
                key={item.documentId}
                className="flex flex-1 cursor-pointer flex-col gap-6 rounded-xl p-6 shadow-customReview transition duration-200 hover:scale-[1.02]"
                onClick={() => redirectToReview(item.documentId)}
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    className="size-12 cursor-pointer hover:opacity-75"
                    onClick={(e) => {
                      e.stopPropagation();
                      redirectToUser(item.users.documentId);
                    }}
                  >
                    <AvatarImage src={`${baseUploadsUrl}/uploads/${item.users.avatar}`} />
                    <AvatarFallback>{item.users.username.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex  flex-col gap-1">
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        redirectToUser(item.users.documentId);
                      }}
                    >
                      {item.users.username}
                    </span>
                    <Stars rating={ratingSum / validateRatings} />
                  </div>
                  <div className="mb-auto ml-auto text-gray-600">{formatDate(item.createdAt)}</div>
                </div>
                <span className="line-clamp-3 text-gray-600">{item.description}</span>
                <div className="mt-auto flex gap-2">
                  {item.images.slice(0, 3).map((image) => (
                    <img
                      src={`${baseUploadsUrl}${image.formats.small.url}`}
                      className="size-16 object-cover"
                      alt={image.name}
                      key={image.documentId}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Like className="mb-1 text-gray-500 group-hover:text-primary" />
                    <span className="w-2 group-hover:text-primary">{item.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dislike className="mt-1 text-gray-500 group-hover:text-primary" />
                    <span className="w-2 group-hover:text-primary">{item.dislikeCount} </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Comment className="text-gray-500 group-hover:text-primary" />
                    <span className="w-2 group-hover:text-primary">{item.commentCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
