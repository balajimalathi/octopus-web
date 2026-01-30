'use client';

import { Badge } from '@/components/ui/badge';
import { VoteButton } from './vote-button';
import { CommentList } from './comment-list';
import { MessageSquare, Check, Clock, Lightbulb, Bug, CircleDot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    type?: string;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
    hasVoted: boolean;
    author?: {
      name: string | null;
      email: string;
      image: string | null;
    };
  };
  boardId: string;
  isOwner: boolean;
  userId?: string;
}

const statusConfig: Record<string, { bg: string; border: string; icon: typeof Check; label: string; badge: string }> = {
  open: {
    bg: 'bg-slate-50 dark:bg-slate-900/50',
    border: 'border-l-slate-400',
    icon: CircleDot,
    label: 'Open',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  in_progress: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-500',
    icon: Clock,
    label: 'In Progress',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  planned: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-l-purple-500',
    icon: Lightbulb,
    label: 'Planned',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  shipped: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-500',
    icon: Check,
    label: 'Done',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  },
  closed: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-l-red-500',
    icon: CircleDot,
    label: 'Closed',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  },
};

export function PostCard({ post, boardId, isOwner, userId }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const config = statusConfig[post.status] || statusConfig.open;
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        'rounded-xl border-l-4 p-5 transition-shadow hover:shadow-md',
        config.bg,
        config.border
      )}
    >
      <div className="flex gap-4">
        {/* Left: Status Icon */}
        <div className="flex-shrink-0">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              post.status === 'shipped' ? 'bg-emerald-500' : 'bg-muted'
            )}
          >
            <StatusIcon
              className={cn(
                'h-5 w-5',
                post.status === 'shipped' ? 'text-white' : 'text-muted-foreground'
              )}
            />
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h3 className="text-base font-semibold text-foreground">{post.title}</h3>
            <Badge className={cn('text-xs font-medium', config.badge)} variant="secondary">
              {config.label}
            </Badge>
            {post.type === 'bug' && (
              <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs" variant="secondary">
                <Bug className="h-3 w-3 mr-1" />
                Bug
              </Badge>
            )}
          </div>

          {post.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {post.description}
            </p>
          )}

          {/* Author and Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={post.author.image || undefined} alt={post.author.name || ''} />
                  <AvatarFallback className="text-[10px]">
                    {(post.author.name || post.author.email)[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{post.author.name || post.author.email}</span>
              </div>
            )}
            <span>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="h-auto p-0 hover:bg-transparent text-xs"
            >
              <MessageSquare className="mr-1 h-3.5 w-3.5" />
              {post.commentCount}
            </Button>
          </div>
        </div>

        {/* Right: Vote */}
        <div className="flex-shrink-0">
          <VoteButton
            postId={post.id}
            initialVoteCount={post.voteCount}
            initialHasVoted={post.hasVoted}
            userId={userId}
          />
        </div>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <CommentList
            postId={post.id}
            userId={userId}
            isOwner={isOwner}
          />
        </div>
      )}
    </div>
  );
}
