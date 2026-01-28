'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CommentFormProps {
  postId: string;
  userId?: string;
  onCommentAdded: () => void;
}

export function CommentForm({ postId, userId, onCommentAdded }: CommentFormProps) {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      window.location.href = '/?signin=true';
      return;
    }

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      toast({
        title: 'Comment posted!',
        description: 'Your comment has been added.',
      });

      setContent('');
      onCommentAdded();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder={userId ? 'Add a comment...' : 'Sign in to comment'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={2000}
        disabled={!userId}
      />
      <Button type="submit" size="sm" disabled={isSubmitting || !userId || !content.trim()}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
}
