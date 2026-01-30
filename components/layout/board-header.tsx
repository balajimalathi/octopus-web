'use client';

import Link from 'next/link';

export function BoardHeader() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            O
          </div>
          <span className="text-lg font-semibold">
            {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
          </span>
        </Link>

        <div className="text-xs text-muted-foreground">
          Powered by {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
        </div>
      </div>
    </header>
  );
}
