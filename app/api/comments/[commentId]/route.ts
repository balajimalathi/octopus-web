import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { deleteComment } from '@/lib/db/queries/comments';
import { db } from '@/lib/db';
import { comments, posts, boards } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const session = await auth.api.getSession({headers: await headers()});

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get comment to check board ownership
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId));

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Get post to find board
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, comment.postId));

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get board to check ownership
    const [board] = await db
      .select()
      .from(boards)
      .where(eq(boards.id, post.boardId));

    if (!board || board.ownerId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteComment(commentId);

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
