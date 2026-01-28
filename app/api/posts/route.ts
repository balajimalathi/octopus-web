import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { createPost, getPostsByBoard } from '@/lib/db/queries/posts';
import { createPostSchema } from '@/lib/validations/post';
import { notifyNewFeedback } from '@/lib/db/queries/notifications';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const boardId = searchParams.get('boardId');
    const sortBy = searchParams.get('sortBy') as 'recent' | 'votes' | null;

    if (!boardId) {
      return NextResponse.json({ error: 'boardId is required' }, { status: 400 });
    }

    const session = await auth.api.getSession({ headers: request.headers });
    const userId = session?.user.id;

    const posts = await getPostsByBoard(boardId, {
      sortBy: sortBy || 'recent',
      userId,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const post = await createPost({
      ...validation.data,
      authorId: session.user.id,
    });

    // Send notification to board owner
    try {
      await notifyNewFeedback({
        postId: post.id,
        boardId: validation.data.boardId,
        authorId: session.user.id,
      });
    } catch (notificationError) {
      console.error('Error sending notification:', notificationError);
      // Don't fail the request if notification fails
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
