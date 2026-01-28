import { pgTable, uuid, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users';

interface ThemeConfig {
  themePreset?: 'default' | 'new-york' | 'custom';
  primaryColor?: string;
  backgroundColor?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
  borderRadius?: string;
  customCSS?: string;
}

export const boards = pgTable('boards', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  isPublic: boolean('is_public').notNull().default(true),

  // Theme configuration stored as JSONB
  themeConfig: jsonb('theme_config').$type<ThemeConfig>().default({
    themePreset: 'default',
    fontFamily: 'sans',
  }),

  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  slugIdx: index('boards_slug_idx').on(table.slug),
  ownerIdx: index('boards_owner_id_idx').on(table.ownerId),
}));
