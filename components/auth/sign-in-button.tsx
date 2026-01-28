'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/auth-client';
import { Chrome } from 'lucide-react';

export function SignInButton() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  };

  return (
    <Button onClick={handleSignIn} size="lg">
      <Chrome className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
  );
}
