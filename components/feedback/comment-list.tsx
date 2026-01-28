'use client';

import { useEffect, useState } from 'react';
import { CommentForm } from './comment-form';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  isOwnerComment: boolean;
  createdAt: Date;
}

interface CommentListProps {
  postId: string;
  userId?: string;
  isOwner: boolean;
}

export function CommentList({ postId, userId, isOwner }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading comments...</div>;
  }

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-semibold text-sm">Comments</h4>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-2 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                {comment.isOwnerComment && (
                  <Badge variant="secondary" className="text-xs">
                    Owner
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      <CommentForm postId={postId} userId={userId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}
