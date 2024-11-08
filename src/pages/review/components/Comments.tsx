import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import CommentsSkeleton from '@pages/review/components/CommentSkeleton.tsx';
import { CommentData } from '@pages/restaurant/interfaces/restaurant.ts';
import CommentInput from '@pages/review/components/CommentInput.tsx';
import { getComments } from '@pages/review/utils/getComments.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '@shared/utils/formatDate.ts';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@shared/ui/button.tsx';
import React, { useState } from 'react';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const Comments = () => {
  const [commentsLoad, setCommentsLoad] = useState(5);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
    refetchOnWindowFocus: false,
  });

  const redirectToUserProfile = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
      {!isFetching ? (
        data && (
          <>
            {data.slice(0, commentsLoad).map((comment: CommentData) => {
              const userData = comment.users;
              return (
                <div key={comment.id}>
                  <div className="my-5 h-px w-full bg-gray-200" />
                  <div className="flex flex-col gap-4 whitespace-pre-wrap">
                    <div className="flex items-center gap-2">
                      <Avatar className="cursor-pointer" onClick={() => redirectToUserProfile(userData.id)}>
                        <AvatarImage src={`${baseUploadsUrl}${userData.avatar}`} />
                        <AvatarFallback>{userData.username.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      {userData.username}
                    </div>
                    {comment.text}
                  </div>
                  <div className="mt-2 text-gray-500">{formatDate(comment.createdAt)}</div>
                </div>
              );
            })}
            {data.length >= commentsLoad && (
              <>
                <div className="my-5 h-px w-full bg-gray-200" />
                <Button className="mx-auto mt-4 w-40" onClick={() => setCommentsLoad(commentsLoad + 5)}>
                  Load more...
                </Button>
              </>
            )}
          </>
        )
      ) : (
        <CommentsSkeleton commentsLength={commentsLoad > 5 ? commentsLoad : 5} />
      )}
    </div>
  );
};

export default Comments;
