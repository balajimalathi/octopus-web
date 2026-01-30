import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { votePost, unvotePost } from '@/lib/db/queries/posts';

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

    await votePost(postId, session.user.id);

    return NextResponse.json({ message: 'Vote recorded successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to vote';
    console.error('Error voting on post:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const session = await auth.api.getSession({headers: await headers()});

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await unvotePost(postId, session.user.id);

    return NextResponse.json({ message: 'Vote removed successfully' });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json(
      { error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
}
