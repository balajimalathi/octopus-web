import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BoardCardProps {
  board: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    isPublic: boolean;
    createdAt: Date;
  };
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{board.name}</CardTitle>
            <CardDescription className="mt-1">
              {board.description || 'No description'}
            </CardDescription>
          </div>
          <Badge variant={board.isPublic ? 'default' : 'secondary'}>
            {board.isPublic ? 'Public' : 'Private'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Created {formatDistanceToNow(new Date(board.createdAt), { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/b/${board.slug}`} target="_blank">
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
        <Link href={`/boards/${board.id}/settings`}>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
