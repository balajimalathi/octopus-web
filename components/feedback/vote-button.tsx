'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonProps {
  postId: string;
  initialVoteCount: number;
  initialHasVoted: boolean;
  userId?: string;
}

export function VoteButton({ postId, initialVoteCount, initialHasVoted, userId }: VoteButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (action: 'up' | 'down') => {
    if (!userId) {
      router.push('/?signin=true');
      return;
    }

    // If clicking up when already voted, or clicking down when not voted
    const shouldRemoveVote = action === 'up' && hasVoted;
    const shouldAddVote = action === 'up' && !hasVoted;

    if (action === 'down' && !hasVoted) {
      // Can't downvote if not voted
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}/vote`, {
        method: shouldRemoveVote ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to vote');
      }

      // Optimistic update
      if (shouldAddVote) {
        setHasVoted(true);
        setVoteCount(voteCount + 1);
      } else if (shouldRemoveVote) {
        setHasVoted(false);
        setVoteCount(voteCount - 1);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to vote';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => handleVote('up')}
        disabled={isLoading}
        className={cn(
          'p-1 rounded transition-colors',
          hasVoted
            ? 'text-orange-500 hover:text-orange-600'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Upvote"
      >
        <ChevronUp className={cn('h-5 w-5', hasVoted && 'fill-current')} />
      </button>
      <span className={cn(
        'text-sm font-semibold tabular-nums',
        hasVoted ? 'text-orange-500' : 'text-muted-foreground'
      )}>
        {voteCount}
      </span>
      <button
        type="button"
        onClick={() => handleVote('down')}
        disabled={isLoading || !hasVoted}
        className={cn(
          'p-1 rounded transition-colors',
          hasVoted
            ? 'text-muted-foreground hover:text-foreground'
            : 'text-muted-foreground/40 cursor-not-allowed'
        )}
        aria-label="Remove vote"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}
