import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1, 'Board name is required').max(100, 'Board name must be less than 100 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  isPublic: z.boolean().default(true),
});

export const updateBoardSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
});

export const updateBoardThemeSchema = z.object({
  themePreset: z.enum(['default', 'new-york', 'custom']).optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color').optional(),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color').optional(),
  fontFamily: z.enum(['sans', 'serif', 'mono']).optional(),
  borderRadius: z.string().regex(/^\d+px$/, 'Must be in format: 8px').optional(),
  customCSS: z.string().max(5000, 'Custom CSS must be less than 5000 characters').optional(),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
export type UpdateBoardThemeInput = z.infer<typeof updateBoardThemeSchema>;
