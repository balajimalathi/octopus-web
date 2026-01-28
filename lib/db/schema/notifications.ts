import { pgTable, uuid, text, timestamp, boolean, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';

export const notificationTypeEnum = pgEnum('notification_type', [
  'new_feedback',
  'new_comment',
  'status_change',
  'new_vote'
]);

interface NotificationMetadata {
  boardId?: string;
  postId?: string;
  commentId?: string;
}

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  type: notificationTypeEnum('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),

  // Store related entity IDs for linking
  metadata: jsonb('metadata').$type<NotificationMetadata>(),

  isRead: boolean('is_read').notNull().default(false),
  emailSent: boolean('email_sent').notNull().default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
