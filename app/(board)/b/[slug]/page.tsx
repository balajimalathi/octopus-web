import { getBoardBySlug } from '@/lib/db/queries/boards';
import { getPostsByBoard } from '@/lib/db/queries/posts';
import { auth } from '@/lib/auth/auth';
import { BoardHeader } from '@/components/board/board-header';
import { PostForm } from '@/components/feedback/post-form';
import { PostList } from '@/components/feedback/post-list';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { type ThemeConfig } from '@/lib/types';

interface BoardPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: 'recent' | 'votes';
  }>;
}

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const board = await getBoardBySlug(slug);

  if (!board) {
    notFound();
  }

  const session = await auth.api.getSession({headers: await headers()});
  
  const posts = await getPostsByBoard(board.id, {
    sortBy: sort || 'recent',
    userId: session?.user.id,
  });

  const themeConfig = board.themeConfig as ThemeConfig | null;

  return (
    <div
      className="min-h-screen bg-muted/30"
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

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Feedback Form (Sticky) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <PostForm boardId={board.id} isAuthenticated={!!session} />
            </div>
          </div>

          {/* Right Column - Post List */}
          <div className="lg:col-span-8">
            <PostList
              posts={posts}
              boardId={board.id}
              boardOwnerId={board.ownerId}
              userId={session?.user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
