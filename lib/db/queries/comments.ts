import 'server-only';

import { db } from '@/lib/db';
import { comments, posts } from '@/lib/db/schema';
import { eq, and, isNull, sql } from 'drizzle-orm';

export async function createComment(data: {
  postId: string;
  authorId: string;
  content: string;
  isOwnerComment: boolean;
}) {
  // Insert comment
  const [comment] = await db.insert(comments).values(data).returning();

  // Increment comment count on post
  await db
    .update(posts)
    .set({
      commentCount: sql`${posts.commentCount} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, data.postId));

  return comment;
}

export async function getCommentsByPost(postId: string) {
  return db
    .select()
    .from(comments)
    .where(and(
      eq(comments.postId, postId),
      isNull(comments.deletedAt)
    ))
    .orderBy(comments.createdAt);
}

export async function deleteComment(commentId: string) {
  const [comment] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId));

  if (!comment) return null;

  // Soft delete
  const [deletedComment] = await db
    .update(comments)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(comments.id, commentId))
    .returning();

  // Decrement comment count on post
  await db
    .update(posts)
    .set({
      commentCount: sql`${posts.commentCount} - 1`,
    })
    .where(eq(posts.id, comment.postId));

  return deletedComment;
}
