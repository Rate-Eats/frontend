import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import CommentsSkeleton from '@pages/review/components/CommentSkeleton.tsx';
import CommentInput from '@pages/review/components/CommentInput.tsx';
import { getComments } from '@pages/review/utils/getComments.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '@shared/utils/formatDate.ts';
import { Comment } from '@shared/types/comment.ts';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@shared/ui/button.tsx';
import React, { useState } from 'react';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

type CommentEditData = { text: string; id: string };

const Comments = () => {
  const [editData, setEditData] = useState<CommentEditData | null>(null);
  const [commentsToShow, setCommentsToShow] = useState(5);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: comments, isFetching } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
    refetchOnWindowFocus: false,
  });

  const navigateToUserProfile = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleEditCommentToggle = (commentData: CommentEditData) => {
    setEditData(editData?.id === commentData.id ? null : commentData);
  };

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
      {isFetching ? (
        <CommentsSkeleton commentsLength={Math.max(commentsToShow, 5)} />
      ) : (
        comments && (
          <>
            {comments.slice(0, commentsToShow).map((comment: Comment) => {
              const user = comment.users;
              const isEditing = editData?.id === comment.documentId;

              return (
                <div key={comment.id}>
                  <div className="my-5 h-px w-full bg-gray-200" />
                  {isEditing ? (
                    <CommentInput editCommentInput={editData} clearEditComment={() => setEditData(null)} />
                  ) : (
                    <div className="flex flex-col gap-4 whitespace-pre-wrap">
                      <div className="flex items-center gap-2">
                        <Avatar className="cursor-pointer" onClick={() => navigateToUserProfile(user.id)}>
                          <AvatarImage src={`${baseUploadsUrl}${user.avatar}`} />
                          <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        {user.username}
                      </div>
                      {comment.text}
                    </div>
                  )}
                  <div className="mt-2 flex justify-between text-gray-500">
                    {formatDate(comment.createdAt)}
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditCommentToggle({ text: comment.text, id: comment.documentId })}>
                        {isEditing ? 'Stop Editing' : 'Edit'}
                      </button>
                      <button className="text-red-500">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
            {comments.length >= commentsToShow && (
              <>
                <div className="my-5 h-px w-full bg-gray-200" />
                <Button className="mx-auto mt-4 w-40" onClick={() => setCommentsToShow(commentsToShow + 5)}>
                  Load more...
                </Button>
              </>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Comments;
