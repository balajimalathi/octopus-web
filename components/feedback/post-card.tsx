'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VoteButton } from './vote-button';
import { CommentList } from './comment-list';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
    hasVoted: boolean;
  };
  boardId: string;
  isOwner: boolean;
  userId?: string;
}

const statusColors: Record<string, string> = {
  open: 'bg-gray-500',
  in_progress: 'bg-blue-500',
  planned: 'bg-purple-500',
  shipped: 'bg-green-500',
  closed: 'bg-red-500',
};

const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  planned: 'Planned',
  shipped: 'Shipped',
  closed: 'Closed',
};

export function PostCard({ post, boardId, isOwner, userId }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <VoteButton
            postId={post.id}
            initialVoteCount={post.voteCount}
            initialHasVoted={post.hasVoted}
            userId={userId}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <Badge className={statusColors[post.status]}>
                {statusLabels[post.status]}
              </Badge>
            </div>

            {post.description && (
              <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                {post.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="h-auto p-0 hover:bg-transparent"
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
              </Button>
            </div>

            {showComments && (
              <div className="mt-6">
                <CommentList
                  postId={post.id}
                  userId={userId}
                  isOwner={isOwner}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
