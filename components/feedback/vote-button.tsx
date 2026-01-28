'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonProps {
  postId: string;
  initialVoteCount: number;
  initialHasVoted: boolean;
  userId?: string;
}

export function VoteButton({ postId, initialVoteCount, initialHasVoted, userId }: VoteButtonProps) {
  const { toast } = useToast();
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    if (!userId) {
      window.location.href = '/?signin=true';
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}/vote`, {
        method: hasVoted ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to vote');
      }

      // Optimistic update
      setHasVoted(!hasVoted);
      setVoteCount(hasVoted ? voteCount - 1 : voteCount + 1);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleVote}
      disabled={isLoading}
      className={cn(
        'flex flex-col items-center gap-1 h-auto py-3 px-4 min-w-[60px]',
        hasVoted && 'bg-primary text-primary-foreground hover:bg-primary/90'
      )}
    >
      <ArrowUp className={cn('h-5 w-5', hasVoted && 'fill-current')} />
      <span className="text-sm font-semibold">{voteCount}</span>
    </Button>
  );
}
