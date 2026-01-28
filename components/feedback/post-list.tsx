'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from './post-card';

interface Post {
  id: string;
  title: string;
  description: string | null;
  status: string;
  voteCount: number;
  commentCount: number;
  createdAt: Date;
  hasVoted: boolean;
  authorId: string;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
        </h2>
        <Tabs value={currentSort} onValueChange={handleSortChange}>
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="votes">Top Voted</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No feedback yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="space-y-4">
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
