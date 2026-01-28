import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { votePost, unvotePost } from '@/lib/db/queries/posts';

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await votePost(params.postId, session.user.id);

    return NextResponse.json({ message: 'Vote recorded successfully' });
  } catch (error: any) {
    console.error('Error voting on post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to vote' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await unvotePost(params.postId, session.user.id);

    return NextResponse.json({ message: 'Vote removed successfully' });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json(
      { error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
}
