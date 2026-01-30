import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { createComment, getCommentsByPost } from '@/lib/db/queries/comments';
import { getPostById } from '@/lib/db/queries/posts';
import { getBoardById } from '@/lib/db/queries/boards';
import { createCommentSchema } from '@/lib/validations/post';
import { notifyOwnerComment } from '@/lib/db/queries/notifications';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const comments = await getCommentsByPost(postId);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const session = await auth.api.getSession({headers: await headers()});

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = createCommentSchema.safeParse({
      ...body,
      postId,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // Check if user is the board owner to set isOwnerComment flag
    const post = await getPostById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const board = await getBoardById(post.boardId);
    const isOwnerComment = board?.ownerId === session.user.id;

    const comment = await createComment({
      postId,
      authorId: session.user.id,
      content: validation.data.content,
      isOwnerComment,
    });

    // Send notification to post author if owner commented
    if (isOwnerComment && board) {
      try {
        await notifyOwnerComment({
          postId,
          commentId: comment.id,
          boardId: board.id,
        });
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
        // Don't fail the request if notification fails
      }
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
