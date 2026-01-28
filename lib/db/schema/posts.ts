import { pgTable, uuid, text, timestamp, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { boards } from './boards';
import { users } from './users';

export const postStatusEnum = pgEnum('post_status', [
  'open',
  'in_progress',
  'planned',
  'shipped',
  'closed'
]);

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  boardId: uuid('board_id').notNull().references(() => boards.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  description: text('description'),
  status: postStatusEnum('status').notNull().default('open'),

  voteCount: integer('vote_count').notNull().default(0),
  commentCount: integer('comment_count').notNull().default(0),

  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  boardIdx: index('posts_board_id_idx').on(table.boardId),
  boardCreatedIdx: index('posts_board_created_idx').on(table.boardId, table.createdAt),
  boardVotesIdx: index('posts_board_votes_idx').on(table.boardId, table.voteCount),
}));
