import { createCommentObject } from '@pages/review/utils/createCommentObject.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';
import { useAuth } from '@auth/useAuth.ts';
import { useState } from 'react';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const CommentInput = () => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { addComment } = useDatabase();
  const { id } = useParams();

  const isCommentValid = () => {
    if (comment.trim().length === 0) {
      setError('Cannot be empty');
      return false;
    }
    setError('');
    return true;
  };

  const addCommentFunc = async () => {
    if (!isCommentValid()) return;
    if (!id || !userData) return;
    const data = createCommentObject(comment, id, userData.documentId);
    await addComment.mutateAsync(data, {
      onSuccess: async () => {
        setComment('');
        await queryClient.invalidateQueries({ queryKey: ['comments'] });
        await queryClient.invalidateQueries({ queryKey: ['restaurant'] });
      },
    });
  };

  const redirectTo = (path: string) => {
    navigate(`/${path}`);
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-primary/50 p-5">
        <p className="text-gray-600">
          Have something to say?{' '}
          <a onClick={() => redirectTo('login')} className="cursor-pointer text-blue-500 hover:underline">
            Sign in
          </a>
          {' or '}
          <a onClick={() => redirectTo('register')} className="cursor-pointer text-blue-500 hover:underline">
            Register
          </a>{' '}
          to add your comment!
        </p>
      </div>
    );
  }

  return (
    <div className={`${error && 'border-red-500'} flex flex-col rounded-lg border border-primary/50 p-5`}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={`${baseUploadsUrl}${userData.avatar}`} />
          <AvatarFallback>{userData.username.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {userData.username}
      </div>
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`mt-2 rounded-none border-0 border-b px-1 shadow-none outline-none focus-visible:ring-0 ${error && 'border-red-500'}`}
        placeholder="write here..."
      />
      <div className="flex items-center gap-2">
        {error && <span className="text-sm text-red-500">{error}</span>}
        <Button className="ml-auto mt-3 w-28" onClick={() => addCommentFunc()}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
