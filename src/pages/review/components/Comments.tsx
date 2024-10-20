import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { ReviewCommentsData } from '@pages/review/interfaces/review.ts';
import CommentInput from '@pages/review/components/CommentInput.tsx';
import { formatDate } from '@shared/utils/formatDate.ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/button.tsx';
import { useState } from 'react';

interface CommentsProps {
  commentList: ReviewCommentsData[];
}

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const Comments = ({ commentList }: CommentsProps) => {
  const [commentsLoad, setCommentsLoad] = useState(5);
  const navigate = useNavigate();
  const redirectToUserProfile = (id: number) => {
    navigate(`/user/${id}`);
  };

  commentList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
      {commentList.slice(0, commentsLoad).map((comment) => {
        const userData = comment.users;
        return (
          <div key={comment.id}>
            <div className="my-5 h-px w-full bg-gray-200" />
            <div className="flex flex-col gap-4">
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
      {commentList.length >= commentsLoad && (
        <>
          <div className="my-5 h-px w-full bg-gray-200" />
          <Button className="mx-auto mt-4 w-40" onClick={() => setCommentsLoad(commentsLoad + 5)}>
            Load more...
          </Button>
        </>
      )}
    </div>
  );
};

export default Comments;
