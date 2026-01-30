'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PostCard } from './post-card';
import { Crown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  description: string | null;
  status: string;
  type?: string;
  voteCount: number;
  commentCount: number;
  createdAt: Date;
  hasVoted: boolean;
  authorId: string;
  author?: {
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface PostListProps {
  posts: Post[];
  boardId: string;
  boardOwnerId: string;
  userId?: string;
}

export function PostList({ posts, boardId, boardOwnerId, userId }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'recent';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Sorting Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleSortChange('votes')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentSort === 'votes'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Crown className="h-4 w-4" />
          Top
        </button>
        <button
          type="button"
          onClick={() => handleSortChange('recent')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentSort === 'recent'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Clock className="h-4 w-4" />
          Recent
        </button>
      </div>

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl bg-muted/30">
          <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              boardId={boardId}
              isOwner={userId === boardOwnerId}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
