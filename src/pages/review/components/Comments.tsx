import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { ReviewCommentsData } from '@pages/review/interfaces/review.ts';
import CommentInput from '@pages/review/components/CommentInput.tsx';
import { formatDate } from '@/utils/formatDate.ts';
import { useNavigate } from 'react-router-dom';

interface CommentsProps {
  commentList: ReviewCommentsData;
}

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const Comments = ({ commentList }: CommentsProps) => {
  const navigate = useNavigate();
  const redirectToUserProfile = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
      {commentList.data.map((comment) => {
        const userData = comment.attributes.users.data;
        return (
          <div key={comment.id}>
            <div className="my-5 h-px w-full bg-gray-200" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer" onClick={() => redirectToUserProfile(userData.id)}>
                  <AvatarImage src={`${baseUploadsUrl}${userData.attributes.avatar}`} />
                  <AvatarFallback>{userData.attributes.username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                {userData.attributes.username}
              </div>
              {comment.attributes.text}
            </div>
            <div className="mt-2 text-gray-500">{formatDate(comment.attributes.createdAt)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
