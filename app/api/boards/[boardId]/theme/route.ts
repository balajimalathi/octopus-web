import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { updateBoardTheme, checkBoardOwnership } from '@/lib/db/queries/boards';
import { updateBoardThemeSchema } from '@/lib/validations/board';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check ownership
    const isOwner = await checkBoardOwnership(params.boardId, session.user.id);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validation = updateBoardThemeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const updatedBoard = await updateBoardTheme(params.boardId, validation.data);

    return NextResponse.json({ board: updatedBoard });
  } catch (error) {
    console.error('Error updating board theme:', error);
    return NextResponse.json(
      { error: 'Failed to update board theme' },
      { status: 500 }
    );
  }
}
