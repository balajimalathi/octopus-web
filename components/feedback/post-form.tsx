'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Lightbulb, Bug } from 'lucide-react';

interface PostFormProps {
  boardId: string;
  isAuthenticated: boolean;
}

type FeedbackType = 'feature' | 'bug';

export function PostForm({ boardId, isAuthenticated }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feature');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/?signin=true');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          boardId,
          type: feedbackType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast({
        title: 'Feedback submitted!',
        description: 'Thank you for your feedback.',
      });

      setFormData({ title: '', description: '' });
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border p-6 shadow-sm">
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFeedbackType('feature')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            feedbackType === 'feature'
              ? 'bg-orange-500 text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Lightbulb className="h-4 w-4" />
          Suggest Feature
        </button>
        <button
          type="button"
          onClick={() => setFeedbackType('bug')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            feedbackType === 'bug'
              ? 'bg-red-500 text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Bug className="h-4 w-4" />
          Report Bug
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder={feedbackType === 'feature' ? 'Feature title...' : 'Bug title...'}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={200}
            className="bg-background"
          />
        </div>
        <div>
          <Textarea
            placeholder={feedbackType === 'feature'
              ? 'Describe the feature you would like to see...'
              : 'Describe the bug and steps to reproduce...'}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            maxLength={5000}
            className="bg-background resize-none"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full',
            feedbackType === 'feature'
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-red-500 hover:bg-red-600'
          )}
        >
          {isSubmitting
            ? 'Submitting...'
            : isAuthenticated
              ? feedbackType === 'feature'
                ? 'Submit Feature Request'
                : 'Submit Bug Report'
              : 'Sign in to Submit'}
        </Button>
      </form>
    </div>
  );
}
