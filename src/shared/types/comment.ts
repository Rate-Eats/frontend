import { User } from '@shared/types/user.ts';

export type Comment = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  users: User;
};


export type NewComment = {
  text: string;
};
