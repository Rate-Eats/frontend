import { createCommentObject } from '@pages/review/utils/createCommentObject.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { useQueryClient } from '@tanstack/react-query';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';
import { useParams } from 'react-router-dom';
import { useAuth } from '@auth/useAuth.ts';
import { useState } from 'react';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const CommentInput = () => {
  const [comment, setComment] = useState('');
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const { addComment } = useDatabase();
  const { id } = useParams();

  const addCommentFunc = async() => {
    if (!id || !userData) return;
    const data = createCommentObject(comment, id, userData.documentId);
    await addComment.mutateAsync(data);
    await queryClient.invalidateQueries({ queryKey: ['review'] })
  };

  if (!userData) return null;

  return (
    <div className="flex flex-col rounded-lg border border-primary/50 p-5">
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
        className="mt-2 rounded-none border-0 border-b px-1 shadow-none outline-none focus-visible:ring-0"
        placeholder="write here..."
      />
      <Button className="ml-auto mt-3 w-28" onClick={() => addCommentFunc()}>
        Comment
      </Button>
    </div>
  );
};

export default CommentInput;
