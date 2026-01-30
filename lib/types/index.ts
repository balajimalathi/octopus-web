import { type InferSelectModel } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

// Database model types
export type User = InferSelectModel<typeof schema.users>;
export type Board = InferSelectModel<typeof schema.boards>;
export type Post = InferSelectModel<typeof schema.posts>;
export type Comment = InferSelectModel<typeof schema.comments>;
export type Vote = InferSelectModel<typeof schema.votes>;
export type Notification = InferSelectModel<typeof schema.notifications>;

// Theme configuration type
export type ThemeConfig = {
  themePreset?: string;
  primaryColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  borderRadius?: string;
  customCSS?: string;
};

// API response types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

// Query result types
export type PostWithVotes = Post & {
  hasVoted?: boolean;
  author: Pick<User, 'id' | 'name' | 'image'>;
};

export type CommentWithAuthor = Comment & {
  author: Pick<User, 'id' | 'name' | 'image'>;
};

export type BoardWithOwner = Board & {
  owner: Pick<User, 'id' | 'name' | 'email'>;
};

// Form data types
export type CreateBoardFormData = {
  name: string;
  slug?: string;
  description?: string;
  isPublic: boolean;
};

export type CreatePostFormData = {
  boardId: string;
  title: string;
  description: string;
};

export type CreateCommentFormData = {
  postId: string;
  content: string;
};

export type UpdateBoardFormData = Partial<CreateBoardFormData>;

export type UpdatePostFormData = {
  title?: string;
  description?: string;
  status?: Post['status'];
};

// Error types
export type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};
