import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { type ThemeConfig } from '@/lib/types';

interface BoardHeaderProps {
  board: {
    name: string;
    description: string | null;
    themeConfig: ThemeConfig | null;
  };
}

export function BoardHeader({ board }: BoardHeaderProps) {
  const themeConfig = board.themeConfig;
  const primaryColor = themeConfig?.primaryColor || '#000000';

  return (
    <header
      className="border-b py-8"
      style={{ borderColor: primaryColor + '20' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-start">
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: primaryColor }}
            >
              {board.name}
            </h1>
            {board.description && (
              <p className="text-lg text-muted-foreground">{board.description}</p>
            )}
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Powered by {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
