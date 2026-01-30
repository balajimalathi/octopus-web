'use client';

import Link from 'next/link';
import { UserAvatar } from '@/components/auth/user-avatar';
import { useSession } from '@/lib/auth/auth-client';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function DashboardHeader() {
  const { data: session } = useSession();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              O
            </div>
            <span className="text-xl font-bold hidden sm:inline">
              {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          {session && (
            <>
              <UserAvatar />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
