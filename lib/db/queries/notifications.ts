import { db } from '@/lib/db';
import { notifications } from '@/lib/db/schema/notifications';
import { users } from '@/lib/db/schema/users';
import { boards } from '@/lib/db/schema/boards';
import { posts } from '@/lib/db/schema/posts';
import { comments } from '@/lib/db/schema/comments';
import { eq, and, sql } from 'drizzle-orm';
import { resend, FROM_EMAIL, APP_NAME, APP_URL } from '@/lib/email/resend-client';
import { render } from '@react-email/render';
import NewFeedbackEmail from '@/lib/email/templates/new-feedback-email';
import FeedbackUpdateEmail from '@/lib/email/templates/feedback-update-email';
import FeedbackShippedEmail from '@/lib/email/templates/feedback-shipped-email';

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
    [key: string]: any;
  };
}

/**
 * Create an in-app notification
 */
export async function createNotification({
  userId,
  type,
  title,
  message,
  metadata = {},
}: CreateNotificationParams) {
  try {
    const [notification] = await db
      .insert(notifications)
      .values({
        userId,
        type,
        title,
        message,
        metadata,
        isRead: false,
        emailSent: false,
      })
      .returning();

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

/**
 * Notify board owner when new feedback is submitted
 */
export async function notifyNewFeedback({
  postId,
  boardId,
  authorId,
}: {
  postId: string;
  boardId: string;
  authorId: string;
}) {
  try {
    // Get board, post, and author details
    const [board] = await db.select().from(boards).where(eq(boards.id, boardId));
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    const [author] = await db.select().from(users).where(eq(users.id, authorId));
    const [owner] = await db.select().from(users).where(eq(users.id, board.ownerId));

    if (!board || !post || !author || !owner) {
      console.error('Missing data for notification');
      return;
    }

    // Don't notify if owner submitted the feedback
    if (board.ownerId === authorId) {
      return;
    }

    // Create in-app notification
    await createNotification({
      userId: board.ownerId,
      type: 'new_feedback',
      title: 'New Feedback Submitted',
      message: `${author.name || 'A user'} submitted feedback: "${post.title}"`,
      metadata: {
        boardId,
        postId,
      },
    });

    // Send email notification
    if (owner.email) {
      try {
        const emailHtml = render(
          NewFeedbackEmail({
            boardName: board.name,
            postTitle: post.title,
            postDescription: post.description || '',
            authorName: author.name || 'Anonymous User',
            boardSlug: board.slug,
            postId: post.id,
            appUrl: APP_URL,
            appName: APP_NAME,
          })
        );

        await resend.emails.send({
          from: FROM_EMAIL,
          to: owner.email,
          subject: `New Feedback: ${post.title}`,
          html: emailHtml,
        });

        // Mark notification as email sent
        await db
          .update(notifications)
          .set({ emailSent: true })
          .where(
            and(
              eq(notifications.userId, board.ownerId),
              eq(notifications.type, 'new_feedback'),
              sql`metadata->>'postId' = ${postId}`
            )
          );
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't throw - notification was created successfully
      }
    }
  } catch (error) {
    console.error('Error in notifyNewFeedback:', error);
    throw error;
  }
}

/**
 * Notify post author when owner comments
 */
export async function notifyOwnerComment({
  postId,
  commentId,
  boardId,
}: {
  postId: string;
  commentId: string;
  boardId: string;
}) {
  try {
    // Get post, board, comment, and users
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    const [board] = await db.select().from(boards).where(eq(boards.id, boardId));
    const [comment] = await db.select().from(comments).where(eq(comments.id, commentId));
    const [author] = await db.select().from(users).where(eq(users.id, post.authorId));
    const [owner] = await db.select().from(users).where(eq(users.id, board.ownerId));

    if (!post || !board || !comment || !author || !owner) {
      console.error('Missing data for comment notification');
      return;
    }

    // Don't notify if the post author is the owner
    if (post.authorId === board.ownerId) {
      return;
    }

    // Create in-app notification
    await createNotification({
      userId: post.authorId,
      type: 'new_comment',
      title: 'New Comment on Your Feedback',
      message: `${owner.name || 'Board owner'} commented on "${post.title}"`,
      metadata: {
        boardId,
        postId,
        commentId,
      },
    });

    // Send email notification
    if (author.email) {
      try {
        const emailHtml = render(
          FeedbackUpdateEmail({
            boardName: board.name,
            postTitle: post.title,
            updateType: 'comment',
            updateContent: comment.content,
            ownerName: owner.name || 'Board Owner',
            boardSlug: board.slug,
            postId: post.id,
            appUrl: APP_URL,
            appName: APP_NAME,
          })
        );

        await resend.emails.send({
          from: FROM_EMAIL,
          to: author.email,
          subject: `New Comment: ${post.title}`,
          html: emailHtml,
        });

        // Mark notification as email sent
        await db
          .update(notifications)
          .set({ emailSent: true })
          .where(
            and(
              eq(notifications.userId, post.authorId),
              eq(notifications.type, 'new_comment'),
              sql`metadata->>'commentId' = ${commentId}`
            )
          );
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }
  } catch (error) {
    console.error('Error in notifyOwnerComment:', error);
    throw error;
  }
}

/**
 * Notify post author and commenters when feedback is marked as shipped
 */
export async function notifyFeedbackShipped({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  try {
    // Get post and board details
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    const [board] = await db.select().from(boards).where(eq(boards.id, boardId));

    if (!post || !board) {
      console.error('Missing data for shipped notification');
      return;
    }

    // Get post author
    const [author] = await db.select().from(users).where(eq(users.id, post.authorId));

    // Get all commenters (unique)
    const commenters = await db
      .selectDistinct({ userId: comments.authorId, email: users.email, name: users.name })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.postId, postId));

    // Collect unique user IDs to notify
    const userIdsToNotify = new Set<string>();
    userIdsToNotify.add(post.authorId);
    commenters.forEach((c) => {
      if (c.userId && c.userId !== board.ownerId) {
        userIdsToNotify.add(c.userId);
      }
    });

    // Send notifications to all users
    for (const userId of userIdsToNotify) {
      // Create in-app notification
      await createNotification({
        userId,
        type: 'status_change',
        title: 'Your Feedback Has Been Shipped!',
        message: `The feedback "${post.title}" has been implemented and shipped.`,
        metadata: {
          boardId,
          postId,
        },
      });

      // Send email
      const user = userId === post.authorId ? author : commenters.find((c) => c.userId === userId);
      if (user?.email) {
        try {
          const emailHtml = render(
            FeedbackShippedEmail({
              boardName: board.name,
              postTitle: post.title,
              postDescription: post.description || '',
              boardSlug: board.slug,
              postId: post.id,
              appUrl: APP_URL,
              appName: APP_NAME,
            })
          );

          await resend.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: `🎉 Your Feedback Has Been Shipped: ${post.title}`,
            html: emailHtml,
          });

          // Mark notification as email sent
          await db
            .update(notifications)
            .set({ emailSent: true })
            .where(
              and(
                eq(notifications.userId, userId),
                eq(notifications.type, 'status_change'),
                sql`metadata->>'postId' = ${postId}`
              )
            );
        } catch (emailError) {
          console.error('Error sending shipped email:', emailError);
        }
      }
    }
  } catch (error) {
    console.error('Error in notifyFeedbackShipped:', error);
    throw error;
  }
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
