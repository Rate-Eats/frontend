import { createCommentObject } from '@pages/review/utils/createCommentObject.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@shared/ui/textarea.tsx';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { useAuth } from '@auth/useAuth.ts';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

type EditCommentInput = { text: string; id: string };

type CommentInputProps = {
  editCommentInput?: EditCommentInput;
  clearEditComment?: () => void;
};

const CommentInput = ({ editCommentInput, clearEditComment }: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState(editCommentInput ? editCommentInput.text : '');
  const [error, setError] = useState('');
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { addComment, updateComment } = useDatabase();
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

    if (editCommentInput) {
      await updateComment.mutateAsync(
        { data, id: editCommentInput.id },
        {
          onSuccess: async () => {
            if (clearEditComment) clearEditComment();
            setComment('');
            await queryClient.invalidateQueries({ queryKey: ['comments'] });
            await queryClient.invalidateQueries({ queryKey: ['restaurant'] });
          },
        },
      );
      return;
    }

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addCommentFunc();
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setComment((prev) => prev + '\n');
    }
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
    if (textareaRef.current) {
      textareaRef.current.scrollTo({ top: 1000, behavior: 'smooth' });
    }
  }, [comment]);

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
    <div
      className={`${error && 'border-red-500'} ${!editCommentInput && 'border border-primary/50 p-5'} flex flex-col rounded-lg `}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={`${baseUploadsUrl}${userData.avatar}`} />
          <AvatarFallback>{userData.username.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {userData.username}
      </div>
      <Textarea
        ref={textareaRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`m-0 mb-1 mt-4 rounded-none border-0 px-1 shadow-none outline-none focus-visible:ring-0 ${error && 'border-red-500'} text-md max-h-[73px] min-h-6 resize-y overflow-y-scroll p-0`}
        placeholder="write here..."
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <div className="flex items-center gap-2 border-t">
        {error && <span className="text-sm text-red-500">{error}</span>}
        <Button className="ml-auto mt-3 w-36" onClick={() => addCommentFunc()}>
          {editCommentInput ? 'Update comment' : 'Comment'}
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
