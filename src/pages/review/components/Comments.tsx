import { ReviewCommentsData } from '@pages/review/interfaces/review.ts';
import CommentInput from '@pages/review/components/CommentInput.tsx';

interface CommentsProps {
  commentList: ReviewCommentsData;
}

const Comments = ({ commentList }: CommentsProps) => {

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
      {commentList.data.map((comment) => {
        return <div>{comment.attributes.text}</div>;
      })}
    </div>
  );
};

export default Comments;
