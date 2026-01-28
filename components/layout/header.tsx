'use client';

import Link from 'next/link';
import { UserAvatar } from '@/components/auth/user-avatar';
import { SignInButton } from '@/components/auth/sign-in-button';
import { useSession } from '@/lib/auth/auth-client';
import { Button } from '@/components/ui/button';

export function Header() {
  const { data: session, isPending } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
        </Link>

        <nav className="flex items-center gap-6">
          {!isPending && (
            <>
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <UserAvatar />
                </>
              ) : (
                <SignInButton />
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
