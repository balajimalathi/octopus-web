'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/auth-client';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
      },
    });
  };

  return (
    <Button onClick={handleSignOut} variant="ghost">
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
