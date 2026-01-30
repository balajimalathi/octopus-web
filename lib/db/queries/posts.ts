import 'server-only';

import { db } from '@/lib/db';
import { posts, votes, users } from '@/lib/db/schema';
import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import { isDuplicateKeyError } from '@/lib/utils/error-handler';

export async function createPost(data: {
  boardId: string;
  authorId: string;
  title: string;
  description?: string;
  type?: 'feature' | 'bug';
}) {
  const [post] = await db.insert(posts).values(data).returning();
  return post;
}

export async function getPostById(postId: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(
      eq(posts.id, postId),
      isNull(posts.deletedAt)
    ));

  return post;
}

export async function getPostsByBoard(
  boardId: string,
  options: { sortBy?: 'recent' | 'votes'; userId?: string } = {}
) {
  const { sortBy = 'recent', userId } = options;
  const orderBy = sortBy === 'votes' ? desc(posts.voteCount) : desc(posts.createdAt);

  // If userId provided, check if they voted
  const postsQuery = db
    .select({
      id: posts.id,
      boardId: posts.boardId,
      authorId: posts.authorId,
      title: posts.title,
      description: posts.description,
      status: posts.status,
      type: posts.type,
      voteCount: posts.voteCount,
      commentCount: posts.commentCount,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      hasVoted: userId
        ? sql<boolean>`EXISTS(
            SELECT 1 FROM ${votes}
            WHERE ${votes.postId} = ${posts.id}
            AND ${votes.userId} = ${userId}
          )`
        : sql<boolean>`false`,
      author: {
        name: users.name,
        email: users.email,
        image: users.image,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(and(
      eq(posts.boardId, boardId),
      isNull(posts.deletedAt)
    ))
    .orderBy(orderBy);

  return postsQuery;
}

export async function updatePost(
  postId: string,
  data: {
    title?: string;
    description?: string;
    status?: 'open' | 'in_progress' | 'planned' | 'shipped' | 'closed';
  }
) {
  const [updatedPost] = await db
    .update(posts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId))
    .returning();

  return updatedPost;
}

export async function deletePost(postId: string) {
  // Soft delete
  const [deletedPost] = await db
    .update(posts)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(posts.id, postId))
    .returning();

  return deletedPost;
}

export async function votePost(postId: string, userId: string) {
  try {
    // Insert vote
    await db.insert(votes).values({ postId, userId });

    // Increment vote count
    await db
      .update(posts)
      .set({
        voteCount: sql`${posts.voteCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId));

    return { success: true };
  } catch (error) {
    // Handle unique constraint violation (user already voted)
    if (isDuplicateKeyError(error)) {
      throw new Error('You have already voted on this post');
    }
    throw error;
  }
}

export async function unvotePost(postId: string, userId: string) {
  // Delete vote
  await db
    .delete(votes)
    .where(and(
      eq(votes.postId, postId),
      eq(votes.userId, userId)
    ));

  // Decrement vote count
  await db
    .update(posts)
    .set({
      voteCount: sql`${posts.voteCount} - 1`,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId));

  return { success: true };
}

export async function hasUserVoted(postId: string, userId: string): Promise<boolean> {
  const [vote] = await db
    .select()
    .from(votes)
    .where(and(
      eq(votes.postId, postId),
      eq(votes.userId, userId)
    ));

  return !!vote;
}
