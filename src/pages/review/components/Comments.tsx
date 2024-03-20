import CommentInput from '@pages/review/components/CommentInput.tsx';

const Comments = () => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <CommentInput />
    </div>
  );
};

export default Comments;
