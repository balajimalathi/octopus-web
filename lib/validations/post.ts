import { z } from 'zod';

export const createPostSchema = z.object({
  boardId: z.string().uuid('Invalid board ID'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(5000, 'Description must be less than 5000 characters').optional(),
  type: z.enum(['feature', 'bug']).optional().default('feature'),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  status: z.enum(['open', 'in_progress', 'planned', 'shipped', 'closed']).optional(),
});

export const createCommentSchema = z.object({
  postId: z.string().uuid('Invalid post ID'),
  content: z.string().min(1, 'Comment cannot be empty').max(2000, 'Comment must be less than 2000 characters'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
