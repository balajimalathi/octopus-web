import { auth } from '@/lib/auth/auth';
import { getBoardsByOwner } from '@/lib/db/queries/boards';
import { Button } from '@/components/ui/button';
import { BoardCard } from '@/components/board/board-card';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login?redirect=/dashboard');
  }

  const boards = await getBoardsByOwner(session.user.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Boards</h1>
          <p className="text-muted-foreground mt-1">
            Manage your feedback boards
          </p>
        </div>
        <Link href="/boards/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Board
          </Button>
        </Link>
      </div>

      {boards.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No boards yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first feedback board to get started
          </p>
          <Link href="/boards/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Board
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}
