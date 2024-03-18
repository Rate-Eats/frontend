import { useAuth } from '@auth/useAuth.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar.tsx';
import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';

const Comments = () => {
  const { userData } = useAuth();
  console.log(userData);
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Comments</span>
      <div className="my-5 h-px w-full bg-gray-200" />

      {userData && (
        <div className="flex flex-col rounded-lg border border-primary/50 p-5">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${userData.avatar}`} />
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
      )}
    </div>
  );
};

export default Comments;
