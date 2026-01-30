import { db } from '@/lib/db';
import { notifications } from '@/lib/db/schema/notifications';
import { eq, and, sql } from 'drizzle-orm';

// TODO: Email integration will be added later
// When ready, uncomment these imports:
// import { sendEmail, APP_NAME, APP_URL } from '@/lib/email/resend-client';
// import { render } from '@react-email/render';
// import NewFeedbackEmail from '@/lib/email/templates/new-feedback-email';
// import FeedbackUpdateEmail from '@/lib/email/templates/feedback-update-email';
// import FeedbackShippedEmail from '@/lib/email/templates/feedback-shipped-email';

export type NotificationType = 'new_feedback' | 'new_comment' | 'status_change' | 'new_vote';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: {
    boardId?: string;
    postId?: string;
    commentId?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

/**
 * Create an in-app notification
 * TODO: Implement when notification system is ready
 */
export async function createNotification(params: CreateNotificationParams) {
  // Stubbed - will be implemented later
  console.log('[STUB] createNotification:', params.type, params.title);
  return null;
}

/**
 * Notify board owner when new feedback is submitted
 * TODO: Implement when notification system is ready
 */
export async function notifyNewFeedback(params: {
  postId: string;
  boardId: string;
  authorId: string;
}) {
  // Stubbed - will be implemented later
  console.log('[STUB] notifyNewFeedback:', params.postId);
}

/**
 * Notify post author when owner comments
 * TODO: Implement when notification system is ready
 */
export async function notifyOwnerComment(params: {
  postId: string;
  commentId: string;
  boardId: string;
}) {
  // Stubbed - will be implemented later
  console.log('[STUB] notifyOwnerComment:', params.commentId);
}

/**
 * Notify post author and commenters when feedback is marked as shipped
 * TODO: Implement when notification system is ready
 */
export async function notifyFeedbackShipped(params: {
  postId: string;
  boardId: string;
}) {
  // Stubbed - will be implemented later
  console.log('[STUB] notifyFeedbackShipped:', params.postId);
}

/**
 * Get user notifications with pagination
 */
export async function getUserNotifications(userId: string, limit = 20, offset = 0) {
  try {
    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(sql`${notifications.createdAt} DESC`)
      .limit(limit)
      .offset(offset);

    return userNotifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string, userId: string) {
  try {
    const [notification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(and(eq(notifications.id, notificationId), eq(notifications.userId, userId)))
      .returning();

    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string) {
  try {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));

    return { success: true };
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string) {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));

    return result[0]?.count || 0;
  } catch (error) {
    console.error('Error getting unread count:', error);
    throw error;
  }
}
