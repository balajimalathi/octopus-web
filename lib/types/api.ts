import { Post, Board, Comment, User } from './index';

export type PostsResponse = {
  posts: Post[];
};

export type BoardsResponse = {
  boards: Board[];
};

export type CommentsResponse = {
  comments: Comment[];
};

export type BoardResponse = {
  board: Board;
};

export type PostResponse = {
  post: Post;
};

export type CommentResponse = {
  comment: Comment;
};

export type VoteResponse = {
  success: boolean;
  message?: string;
};

export type ErrorResponse = {
  error: string;
  details?: unknown;
};
