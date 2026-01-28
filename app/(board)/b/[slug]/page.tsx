import { getBoardBySlug } from '@/lib/db/queries/boards';
import { getPostsByBoard } from '@/lib/db/queries/posts';
import { auth } from '@/lib/auth/auth';
import { BoardHeader } from '@/components/board/board-header';
import { PostForm } from '@/components/feedback/post-form';
import { PostList } from '@/components/feedback/post-list';
import { notFound } from 'next/navigation';

interface BoardPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: 'recent' | 'votes';
  };
}

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const board = await getBoardBySlug(params.slug);

  if (!board) {
    notFound();
  }

  const session = await auth.api.getSession();
  const posts = await getPostsByBoard(board.id, {
    sortBy: searchParams.sort || 'recent',
    userId: session?.user.id,
  });

  const themeConfig = board.themeConfig as any;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: themeConfig?.backgroundColor,
        fontFamily: themeConfig?.fontFamily === 'serif'
          ? 'Georgia, serif'
          : themeConfig?.fontFamily === 'mono'
          ? 'monospace'
          : 'system-ui, sans-serif',
      }}
    >
      {themeConfig?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: themeConfig.customCSS }} />
      )}

      <BoardHeader board={board} />

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <PostForm boardId={board.id} isAuthenticated={!!session} />
        <PostList posts={posts} boardId={board.id} boardOwnerId={board.ownerId} userId={session?.user.id} />
      </div>
    </div>
  );
}
