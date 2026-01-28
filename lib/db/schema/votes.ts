import { pgTable, uuid, timestamp, unique } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';

export const votes = pgTable('votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  uniqueVote: unique('unique_post_user_vote').on(table.postId, table.userId),
}));
