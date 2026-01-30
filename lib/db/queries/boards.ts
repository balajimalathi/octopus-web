import 'server-only';

import { db } from '@/lib/db';
import { boards } from '@/lib/db/schema/boards';
import { eq, and, isNull } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { type ThemeConfig } from '@/lib/types';

export async function createBoard(data: {
  ownerId: string;
  name: string;
  slug?: string;
  description?: string;
  isPublic?: boolean;
}) {
  // Generate slug if not provided
  const baseSlug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const uniqueSlug = `${baseSlug}-${nanoid(6)}`;

  const [board] = await db.insert(boards).values({
    ...data,
    slug: uniqueSlug,
  }).returning();

  return board;
}

export async function getBoardBySlug(slug: string) {
  const [board] = await db
    .select()
    .from(boards)
    .where(and(
      eq(boards.slug, slug),
      isNull(boards.deletedAt)
    ));

  return board;
}

export async function getBoardById(id: string) {
  const [board] = await db
    .select()
    .from(boards)
    .where(and(
      eq(boards.id, id),
      isNull(boards.deletedAt)
    ));

  return board;
}

export async function getBoardsByOwner(ownerId: string) {
  return db
    .select()
    .from(boards)
    .where(and(
      eq(boards.ownerId, ownerId),
      isNull(boards.deletedAt)
    ))
    .orderBy(boards.createdAt);
}

export async function updateBoard(
  boardId: string,
  data: {
    name?: string;
    description?: string;
    isPublic?: boolean;
  }
) {
  const [updatedBoard] = await db
    .update(boards)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(boards.id, boardId))
    .returning();

  return updatedBoard;
}

export async function updateBoardTheme(boardId: string, themeConfig: ThemeConfig) {
  const [updatedBoard] = await db
    .update(boards)
    .set({
      themeConfig,
      updatedAt: new Date(),
    })
    .where(eq(boards.id, boardId))
    .returning();

  return updatedBoard;
}

export async function deleteBoard(boardId: string) {
  // Soft delete
  const [deletedBoard] = await db
    .update(boards)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(boards.id, boardId))
    .returning();

  return deletedBoard;
}

export async function checkBoardOwnership(boardId: string, userId: string): Promise<boolean> {
  const board = await getBoardById(boardId);
  return board?.ownerId === userId;
}
