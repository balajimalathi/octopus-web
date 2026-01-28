import { getBoardById } from '@/lib/db/queries/boards';
import { getPostsByBoard } from '@/lib/db/queries/posts';
import { PostList } from '@/components/feedback/post-list';
import { notFound } from 'next/navigation';

export default async function EmbedPage({
  params,
  searchParams
}: {
  params: { boardId: string };
  searchParams: { embedded?: string };
}) {
  const board = await getBoardById(params.boardId);

  if (!board || !board.isPublic) {
    notFound();
  }

  const posts = await getPostsByBoard(board.id);

  return (
    <html>
      <head>
        <title>{board.name}</title>
        <link rel="stylesheet" href="/embed/widget.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="embed-mode" style={{ margin: 0, padding: 0 }}>
        <div style={{ minHeight: '400px', padding: '1rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>{board.name}</h2>
          {board.description && (
            <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280' }}>{board.description}</p>
          )}

          {posts.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
              No feedback yet. Be the first to post!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {posts.slice(0, 10).map((post) => (
                <div
                  key={post.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '48px'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>▲</span>
                    <span style={{ fontWeight: '600' }}>{post.voteCount}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
                      {post.title}
                    </h3>
                    {post.description && (
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                        {post.description.substring(0, 150)}
                        {post.description.length > 150 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/b/${board.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              View full board →
            </a>
          </div>
        </div>

        {searchParams.embedded === 'true' && (
          <script dangerouslySetInnerHTML={{
            __html: `
              function sendHeight() {
                const height = document.body.scrollHeight;
                window.parent.postMessage({
                  type: 'octopus-resize',
                  height: height
                }, '*');
              }

              sendHeight();
              window.addEventListener('resize', sendHeight);
              new ResizeObserver(sendHeight).observe(document.body);
            `
          }} />
        )}
      </body>
    </html>
  );
}
