import { pgTable, uuid, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorId: text('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  content: text('content').notNull(),
  isOwnerComment: boolean('is_owner_comment').notNull().default(false),

  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  postIdx: index('comments_post_id_idx').on(table.postId),
}));
