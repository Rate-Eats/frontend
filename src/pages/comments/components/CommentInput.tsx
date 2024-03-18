import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';
import { useAuth } from '@auth/useAuth.ts';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const CommentInput = () => {
  const { userData } = useAuth();

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
        className="mt-2 rounded-none border-0 border-b px-1 shadow-none outline-none focus-visible:ring-0"
        placeholder="write here..."
      />
      <Button className="ml-auto mt-3 w-28">Comment</Button>
    </div>
  );
};

export default CommentInput;
