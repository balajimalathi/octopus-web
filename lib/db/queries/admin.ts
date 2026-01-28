import 'server-only';

import { db } from '@/lib/db';
import { users, boards, posts } from '@/lib/db/schema';
import { eq, isNull, sql } from 'drizzle-orm';

export async function getAllUsers() {
  return db.select().from(users).orderBy(users.createdAt);
}

export async function getAllBoards() {
  return db
    .select()
    .from(boards)
    .where(isNull(boards.deletedAt))
    .orderBy(boards.createdAt);
}

export async function getPlatformStats() {
  const [userCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users);

  const [boardCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(boards)
    .where(isNull(boards.deletedAt));

  const [postCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(isNull(posts.deletedAt));

  const [publicBoardCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(boards)
    .where(sql`${boards.isPublic} = true AND ${boards.deletedAt} IS NULL`);

  return {
    totalUsers: userCount?.count || 0,
    totalBoards: boardCount?.count || 0,
    totalPosts: postCount?.count || 0,
    publicBoards: publicBoardCount?.count || 0,
  };
}

export async function updateUserRole(
  userId: string,
  role: 'user' | 'owner' | 'admin' | 'super_admin'
) {
  const [updatedUser] = await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser;
}
